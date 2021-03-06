Class('Symbie.Context', {
    
    trait : 'JooseX.CPS',
    
    has : {
        dispatchedFrom          : { required : true },
        dispatchParams          : { required : true },
        
        controller              : { required : true },
        match                   : { required : true },
        
        path                    : null,
        query                   : null,
        
        compChain               : Joose.I.Array,
        
        stash                   : Joose.I.Object
    },
    
    
    methods : {
        
        get : function (name) {
            return this.stash[ name ]
        },
        
        
        set : function (name, value) {
            this.stash[ name ] = value
        },
        
        
        app : function () {
            return this.getRoot()
        },
        
        
        getRoot : function () {
            return this.compChain[0]
        },
        
        
        initialize : function () {
            this.controller.getParents(this.compChain)
        },
        
        
        getParameters : function () {
            return this.match.parameters
        },
        
        
        getParams : function () {
            return this.getParameters()
        },
        
        
        getParamsOrder : function () {
            return this.match.paramsOrder
        },
        
        
        getParam : function (name) {
            return this.getParameters()[ name ]
        },
        
        
        getSplat : function () {
            return this.match.path
        },
        
        
        getRoute : function () {
            return this.match.route
        },
        
        
        eachComp : function (func, scope) {
            return Joose.A.each(this.compChain, func, scope || this)
        },
        
        
        eachCompR : function (func, scope) {
            var compChain = this.compChain
            
            for (var i = compChain.length - 1; i >= 0; i--)
                if (func.call(scope || this, compChain[i], i) === false) return false
        },
        
        
        runACTIVATE : function () {
            
            this.eachComp(function (controller) {
                
                controller.ACTIVATE(this)
            })
        },
        
        
        runFINALIZE : function () {
            
            this.eachCompR(function (controller) {
                
                controller.FINALIZE(this)
            })
        }
    },
    
    
    continued : {
        
        methods : {
            
            call : function (params) {
                var dispatchedFrom      = this.dispatchedFrom
                
                var match               = dispatchedFrom.findMatch(params)
                
                match.route.doExecute(this).now()
            },
            
            
            visit : function (path) {
//                this.redirected = true
//                
//                var me = this
//                
//                this.router.dispatch({
//                    routePath       : path,
//                    prevContext     : this
//                }).andThen(function () {
//                    
//                    this.CONTINUE(me)
//                })
            },
            
            
            redirect : function (path) {
//                this.redirected = true
//                
//                var me = this
//                
//                this.router.dispatch({
//                    routePath       : path,
//                    prevContext     : this
//                }).andThen(function () {
//                    
//                    this.CONTINUE(me)
//                })
            },
            
            
            run : function () {
                var me          = this
                var route       = this.getRoute()
                var controller  = this.controller
                
                this.runPRE().andThen(function (stop) {
                    
                    if (stop) {
                        this.CONTINUE(me)
                        
                        return
                    }
                    
                    this.runACTIVATE()      // sync
                    
                    controller.BEGIN(this)  // async
                    
                    route.doExecute(this)     // async
                    
                    controller.END(this).andThen(function () {
                        
                        me.runFINALIZE()    // sync
                        
                        this.CONTINUE(me)
                    })
                })
            },
            
            
            runPRE : function () {
                
                this.eachComp(function (controller) {
                    
                    controller.PRE(this).then(function (stop) {
                        
                        if (stop === false) 
                            this.RETURN(true)
                        else
                            this.CONTINUE()
                    })
                })
                
                this.NOW()
            }
        }
    }
    
})
Class('DemoApp', {
    
    isa         : 'Symbie.Application',

    trait       : 'JooseX.Class.Singleton',
    
    plugins     : [
        'SymbieX.History'
    ],
    
    
    use         : [ 
        'DemoApp.Widget.Root',
        'DemoApp.Layout.Site',
        'DemoApp.Widget.Header',
        'DemoApp.Widget.Footer',
        'DemoApp.Widget.Home'
    ],
    
    
    has : {
        root            : null
    },
    
    
    methods : {
        
        createMainLayout : function (context) {
            
            context.stash.root.activate(context, { 
                xtype       : 'DemoApp.Layout.Site',
                
                slot        : 'mainLayout',

                children    : {
                    header  : { xtype : 'DemoApp.Widget.Header' },
                    
                    footer  : { xtype : 'DemoApp.Widget.Footer' }
                }
            })
        },
        
        
        ACTIVATE : function (c) {
            var root = c.stash.root = this.root
        },
        
        
        FINALIZE : function (c) {
            var root = c.stash.root
            
            root.doLayout()
        }
    },
    
    
    continued : {
        
        methods : {
            
            setup : function () {
                var me      = this
                
                this.AND(function () {
                    
                    var CONTINUE = this.getCONTINUE()
                    
                    Ext.onReady(function () {
                        
                        me.root = new DemoApp.Widget.Root({
                            app   : this
                        })
                        
                        CONTINUE()
                    })
                })
                
                this.SUPER().now()
            }
        }
    },
    
    
    routes : {
        
        '/' : function (context) {
            var root = context.stash.root
            
            this.createMainLayout(context)
            
            root.slots.mainLayout.slots.center.activate(context, {
                xtype : 'DemoApp.Widget.Home'
            })
            
            this.CONTINUE()
        },
        
        
        '/home' : function (context) {
            
            var root = context.stash.root
            
//            this.createMainLayout(root)
            
            this.CONTINUE()
        },
        
        
        '/sample/:value' : function (context, value) {
            var root = context.stash.root
            
//            this.createMainLayout(context)
//            
//            root.slots.mainLayout.slots.center.activate(context, {
//                xtype : 'DemoApp.Widget.Home'
//            })
            
            this.CONTINUE()
        },
        
        
        '/special-offer' : {
            use     : 'DemoApp.Widget.SpecialOffer',
            
            action  : function (context) {
                var root = context.stash.root
                
                this.createMainLayout(context)
                
                root.slots.mainLayout.slots.center.activate(context, {
                    xtype : 'DemoApp.Widget.SpecialOffer'
                })
                
                this.CONTINUE()
            }
        }, 
        
        
        '/*' : function (context) {
            var root = context.stash.root
            
//            this.createMainLayout(root)
            
            this.CONTINUE()
        },
        
        
        '/error' : function (context) {
            throw "Ah, sometimes this happens"
        }
    }
})


//    after : {
//        initialize : function () {
//            this.on('dispatchException', this.onDispatchException, this)
//        }
//    },
//    
//    
//    methods : {
//        
//        onDispatchException : function (router, exception) {
//            
//            Ext.Msg.show({
//               title    : 'Error:',
//               msg      : exception,
//               
//               buttons  : Ext.Msg.OK,
//               icon     : Ext.MessageBox.ERROR
//            })
//            
//            return false
//        }
//    }

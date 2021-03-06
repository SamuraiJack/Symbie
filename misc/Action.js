Role('Symbie.Meta.Action', {
    
    meta    : Joose.Meta.Class,
    
    isa     : Joose.Managed.Property,
    
    use     : [ 
        'Symbie.Meta.Route.Token.String', 
        'Symbie.Meta.Route.Token.Root', 
        'Symbie.Meta.Route.Token.Parameter', 
        'Symbie.Meta.Route.Token.WildCard' 
    ],
    
    
    has : {
        prefix                  : null,
        
        where                   : null,
        
        via                     : null,
        
        tokens                  : Joose.I.Array
    },
    
    
    after : {
        
        initialize : function (properties) {
            
            var tokens = typeof this.mapTo == 'string' && this.mapTo.split('/') || []
            
            Joose.A.each(tokens, function (token, index) {
                this.tokens.push(this.createToken(token, index))
            }, this)
        }
    },
    
    
    methods : {
        
        AUTO : function (token, index) {
            if (token == '' && !index)      return new Symbie.Meta.Route.Token.Root()
            
            if (/^\*/.test(token))          return new Symbie.Meta.Route.Token.WildCard()
            
            if (/^:/.test(token)) {
                var name = /^:(.*)/.exec(token)[1]
                
                var regex = this.where && this.where[name] || /(.*)/
                
                return new Symbie.Meta.Route.Token.Parameter({ token : token, name : name, regex : regex })
            }
            
            return new Symbie.Meta.Route.Token.String({ token : token })
        },
        
        
        prepareApply : function (target) {
        },
        
        
        apply : function (target) {
        },
        
        
        unapply : function (from) {
        },
        
        
        asString : function (parameters) {
            var res = []
            
            Joose.A.each(this.tokens, function (token, index) {
                var str = token.asString(parameters)
                
                if (str != null) res.push(str)
            })
            
            return res.join('/')
        }
    }
    
})

StartTest(function(t) {
	
    t.plan(7)
    
    var async1 = t.beginAsync()
    
    use('Symbie.Router', function () {
        
        //==================================================================================================================================================================================
        t.diag("Sanity")
        
        t.ok(Symbie.Router, "Symbie.Router is here")
        t.ok(Symbie.Meta.Router, "Symbie.Meta.Router is here")
        
        t.ok(Symbie.Router.meta.meta.does(Symbie.Meta.Router), "'Symbie.Router' has correct meta")
        
        
        //==================================================================================================================================================================================
        t.diag("Class creation")
        
        
        Class('App.Router', {
            
            isa : 'Symbie.Router',
            
            
            routes : {
                
                home : {
                    mapTo : '/home',
                    
                    via : function (route) {
                    } 
                },
                
                
                allPictures : {
                    mapTo : '/pictures/all/:fromDate/:toDate',
                    
                    where : {
                        fromDate    : /\d\d-\d\d-\d{4}/,
                        toDate      : /.*/
                    },
                    
                    via : function (route) {
                    }
                },
                
                
                picture : {
                    mapTo : '/pictures/:id',
                    
                    where : {
                        id    : /\d+/
                    },
                    
                    via : function (route) {
                    }
                },
                
                
                editPicture : {
                    mapTo : '/pictures/:id/edit',
                    
                    where : {
                        id    : /\d+/
                    },
                    
                    via : function (route) {
                    }
                },
                
                
                editWiki : {
                    mapTo : '/wiki/edit',
                    
                    via : function (route) {
                    }
                },
                
                
                wikiPage : {
                    mapTo : '/wiki/:page',
                    
                    via : function (route) {
                    }
                },
                
                
                wiki : {
                    mapTo : '/wiki/*',
                    
                    via : function (route) {
                    }
                },
                
                
                index : {
                    mapTo : '/',
                    
                    via : function (route) {
                        route.forward('home')
                    }
                }
                
            }
            //eof routes
        })
        
        t.ok(App.Router, "App.Router is here")
        
        t.ok(App.Router.meta.hasRoute('default'), "'default' route was inheried from 'Symbie.Router' (and composed from 'Symbie.Router.Default')")
        
        var defaultRoute = App.Router.meta.getRoute('default')
        
        t.ok(defaultRoute instanceof Symbie.Meta.Route, "'default' route isa Symbie.Meta.Route")
        
        t.ok(App.Router.meta.hasRoute('home'), "Route 'home' was defined via 'routes' builder")
        t.ok(App.Router.meta.hasRoute('index'), "Route 'index' was defined via 'routes' builder")
        
        
        //==================================================================================================================================================================================
        t.diag("Instantiation")
        
        var router = new App.Router({
            root : {}
        })
        
        t.ok(router, "'App.Router' was successfully instantiated")

        
        //==================================================================================================================================================================================
        t.diag("Finding matching route #1")
        
        var match1 = router.findMatch('/home')
        
        t.ok(match1, "Match for '/home' was found")
        t.ok(match1.route == App.Router.meta.getRoute('home'), ".. and it has a correct route")
        
        
        //==================================================================================================================================================================================
        t.diag("Finding route #2")
        
        var match2 = router.findMatch('/wiki/foo/bar')
        
        t.ok(match2, "Match for '/wiki/foo/bar' was found")
        t.ok(match2.route == App.Router.meta.getRoute('wiki'), ".. and it has a correct route")
        t.ok(match2.path.length == 2, ".. match contains 2 path elements")
        t.ok(match2.path[0] == 'foo' && match2.path[0] == 'bar', ".. match contains 2 correct path elements")
        
        
        //==================================================================================================================================================================================
        t.diag("Dispatching #1")
        
//        var async2 = t.beginAsync()
//        
//        router.dispatch('/home').then(function () {
//            
//            t.endAsync(async2)
//        }).now()
        
        t.endAsync(async1)
    })
    
})
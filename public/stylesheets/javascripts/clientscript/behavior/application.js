//Applies behaviour rules to the classes
//Author: Brian R Miedlar (c) 2006-2009

var AppBehavior = Class.create();
AppBehavior.Load = function() {
    
    OS.RegisterBehaviour(AppBehavior.CarouselRules);
}
AppBehavior.CarouselRules = {

    '#Carousel': function(element) {
        //Simple profiles
        AppBehavior.ProfileCarousel = new Carousel('ProfileCarousel', element, 100, 69, AppBehavior, {
            setSize: 4,
            duration: .5,
            direction: 'vertical',
            itemParser: function(item) {
                //Given html element you can build a data object for the item if needed for later activation
                var sKey = item.down('.key').innerHTML;
                var sCaption = item.down('.caption').innerHTML;
                var sEmail = item.down('.email').innerHTML;
                return { name: sCaption, email: sEmail };
            },
            setItemEvents: function(carousel, itemElement, carouselItem, observer) {
                //This allows you to set events to the item like rollovers/mouse events
                Event.observe(itemElement, 'click', function() {
                    carousel.activate(carouselItem);
                });
                Event.observe(itemElement, 'mouseover', function() {
                    Element.addClassName(itemElement, 'hover');
                });
                Event.observe(itemElement, 'mouseout', function() {
                    Element.removeClassName(itemElement, 'hover');
                });
            },
            allowAutoLoopOnSet: false,
            allowAutoLoopOnIndividual: true
        });
        AppBehavior.ProfileCarousel.load();
    },
	 '#Carousel3': function(element) {
        //Simple profiles
        AppBehavior.ProfileCarousel = new Carousel('ProfileCarousel', element, 50, 54, AppBehavior, {
            setSize: 2,
            duration: .3,
            direction: 'vertical',
            itemParser: function(item) {
                //Given html element you can build a data object for the item if needed for later activation
                var sKey = item.down('.key').innerHTML;
                var sCaption = item.down('.caption').innerHTML;
                var sEmail = item.down('.email').innerHTML;
                return { name: sCaption, email: sEmail };
            },
            setItemEvents: function(carousel, itemElement, carouselItem, observer) {
                //This allows you to set events to the item like rollovers/mouse events
                Event.observe(itemElement, 'click', function() {
                    carousel.activate(carouselItem);
                });
                Event.observe(itemElement, 'mouseover', function() {
                    Element.addClassName(itemElement, 'hover');
                });
                Event.observe(itemElement, 'mouseout', function() {
                    Element.removeClassName(itemElement, 'hover');
                });
            },
            allowAutoLoopOnSet: false,
            allowAutoLoopOnIndividual: true
        });
        AppBehavior.ProfileCarousel.load();
    },
	 '#Crete_interview_Carousel': function(element) {
        //Simple profiles
        AppBehavior.ProfileCarousel = new Carousel('ProfileCarousel', element, 50, 110, AppBehavior, {
            setSize: 4,
            duration: .3,
            direction: 'vertical',
            itemParser: function(item) {
                //Given html element you can build a data object for the item if needed for later activation
               
            },
            setItemEvents: function(carousel, itemElement, carouselItem, observer) {
                //This allows you to set events to the item like rollovers/mouse events
                Event.observe(itemElement, 'click', function() {
                    carousel.activate(carouselItem);
                });
                Event.observe(itemElement, 'mouseover', function() {
                    Element.addClassName(itemElement, 'hover');
                });
                Event.observe(itemElement, 'mouseout', function() {
                    Element.removeClassName(itemElement, 'hover');
                });
            },
            allowAutoLoopOnSet: false,
            allowAutoLoopOnIndividual: true
        });
        AppBehavior.ProfileCarousel.load();
    },
	'#Interview_List_Carousel': function(element) {
        //Simple profiles
        AppBehavior.ProfileCarousel = new Carousel('ProfileCarousel', element, 60, 82, AppBehavior, {
            setSize: 5,
            duration: .3,
            direction: 'vertical',
            itemParser: function(item) {
                //Given html element you can build a data object for the item if needed for later activation
                //var sKey = item.down('.key').innerHTML;
              //  var sCaption = item.down('.caption').innerHTML;
              //  var sEmail = item.down('.email').innerHTML;
              //  return { name: sCaption, email: sEmail };
            },
            setItemEvents: function(carousel, itemElement, carouselItem, observer) {
                //This allows you to set events to the item like rollovers/mouse events
                Event.observe(itemElement, 'click', function() {
                    carousel.activate(carouselItem);
                });
                Event.observe(itemElement, 'mouseover', function() {
                    Element.addClassName(itemElement, 'hover');
                });
                Event.observe(itemElement, 'mouseout', function() {
                    Element.removeClassName(itemElement, 'hover');
                });
            },
            allowAutoLoopOnSet: false,
            allowAutoLoopOnIndividual: true
        });
        AppBehavior.ProfileCarousel.load();
    },
	
	 '#Carousel5': function(element) {
        //Simple profiles
        AppBehavior.ProfileCarousel = new Carousel('ProfileCarousel', element, 100, 74, AppBehavior, {
            setSize: 4,
            duration: .5,
            direction: 'vertical',
            itemParser: function(item) {
                //Given html element you can build a data object for the item if needed for later activation
                var sKey = item.down('.key').innerHTML;
                var sCaption = item.down('.caption').innerHTML;
                var sEmail = item.down('.email').innerHTML;
                return { name: sCaption, email: sEmail };
            },
            setItemEvents: function(carousel, itemElement, carouselItem, observer) {
                //This allows you to set events to the item like rollovers/mouse events
                Event.observe(itemElement, 'click', function() {
                    carousel.activate(carouselItem);
                });
                Event.observe(itemElement, 'mouseover', function() {
                    Element.addClassName(itemElement, 'hover');
                });
                Event.observe(itemElement, 'mouseout', function() {
                    Element.removeClassName(itemElement, 'hover');
                });
            },
            allowAutoLoopOnSet: false,
            allowAutoLoopOnIndividual: true
        });
        AppBehavior.ProfileCarousel.load();
    },
	
	 '#dashboard_list': function(element) {
        //Simple profiles
        AppBehavior.ProfileCarousel = new Carousel('ProfileCarousel', element, 100, 73, AppBehavior, {
           setSize: 4,
            duration: .3,
            direction: 'vertical',
            itemParser: function(item) {
                //Given html element you can build a data object for the item if needed for later activation

            },
            setItemEvents: function(carousel, itemElement, carouselItem, observer) {
                //This allows you to set events to the item like rollovers/mouse events
                Event.observe(itemElement, 'click', function() {
                    carousel.activate(carouselItem);
                });
                Event.observe(itemElement, 'mouseover', function() {
                    Element.addClassName(itemElement, 'hover');
                });
                Event.observe(itemElement, 'mouseout', function() {
                    Element.removeClassName(itemElement, 'hover');
                });
            },
            allowAutoLoopOnSet: false,
            allowAutoLoopOnIndividual: false
        });
        AppBehavior.ProfileCarousel.load();
    },
    '#pre_interview': function(element) {
        //Simple profiles
        AppBehavior.ProfileCarousel = new Carousel('ProfileCarousel', element, 100, 79, AppBehavior, {
            setSize: 4,
            duration: .4,
            direction: 'vertical',
            itemParser: function(item) {
                //Given html element you can build a data object for the item if needed for later activation
                var sKey = item.down('.key').innerHTML;
                var sCaption = item.down('.caption').innerHTML;
                var sEmail = item.down('.email').innerHTML;
                return { name: sCaption, email: sEmail };
            },
            setItemEvents: function(carousel, itemElement, carouselItem, observer) {
                //This allows you to set events to the item like rollovers/mouse events
                Event.observe(itemElement, 'click', function() {
                    carousel.activate(carouselItem);
                });
                Event.observe(itemElement, 'mouseover', function() {
                    Element.addClassName(itemElement, 'hover');
                });
                Event.observe(itemElement, 'mouseout', function() {
                    Element.removeClassName(itemElement, 'hover');
                });
            },
            allowAutoLoopOnSet: false,
            allowAutoLoopOnIndividual: true
        });
        AppBehavior.ProfileCarousel.load();
    },
    '#dashboard_ints': function(element) {
        //Simple profiles
        AppBehavior.ProfileCarousel = new Carousel('ProfileCarousel', element, 100, 79, AppBehavior, {
            setSize: 4,
            duration: .4,
            direction: 'vertical',
           
            setItemEvents: function(carousel, itemElement, carouselItem, observer) {
                //This allows you to set events to the item like rollovers/mouse events
                Event.observe(itemElement, 'click', function() {
                    carousel.activate(carouselItem);
                });
                Event.observe(itemElement, 'mouseover', function() {
                    Element.addClassName(itemElement, 'hover');
                });
                Event.observe(itemElement, 'mouseout', function() {
                    Element.removeClassName(itemElement, 'hover');
                });
            },
            allowAutoLoopOnSet: false,
            allowAutoLoopOnIndividual: true
        });
        AppBehavior.ProfileCarousel.load();
    },
	
	 '#dashboard_interviews': function(element) {
        //Simple profiles
        AppBehavior.ProfileCarousel = new Carousel('ProfileCarousel', element, 100, 69, AppBehavior, {
            setSize: 4,
            duration: .4,
            direction: 'vertical',
            
            setItemEvents: function(carousel, itemElement, carouselItem, observer) {
                //This allows you to set events to the item like rollovers/mouse events
                Event.observe(itemElement, 'click', function() {
                    carousel.activate(carouselItem);
                });
                Event.observe(itemElement, 'mouseover', function() {
                    Element.addClassName(itemElement, 'hover');
                });
                Event.observe(itemElement, 'mouseout', function() {
                    Element.removeClassName(itemElement, 'hover');
                });
            },
            allowAutoLoopOnSet: false,
            allowAutoLoopOnIndividual: true
        });
        AppBehavior.ProfileCarousel.load();
    },   
    '#Carousel2': function(element) {
        //Pictures
        AppBehavior.PictureCarousel = new Carousel('PictureCarousel', element, 90, 70, AppBehavior, {
            setSize: 5,
            duration: .5,
            direction: 'horizontal',
            itemParser: function(item) {
                //Given html element you can build a data object for the item if needed for later activation
                var sKey = item.down('.key').innerHTML;
                var sCaption = item.down('.caption').innerHTML;
                var sPictureHtml = item.down('.picture').innerHTML;
                return { name: sCaption, pictureHtml: sPictureHtml };
            },
            setItemEvents: function(carousel, itemElement, carouselItem, observer) {
                //This allows you to set events to the item like rollovers/mouse events
                Event.observe(itemElement, 'click', function() {
                    carousel.activate(carouselItem);
                });
            },
            allowAutoLoopOnSet: true,
            allowAutoLoopOnIndividual: false
        });
        AppBehavior.PictureCarousel.load();
    },
    '#Cmd_NextItem': function(element) {
        Event.observe(element, 'click', function() {
            AppBehavior.ProfileCarousel.next();
        });
    },
    '#Cmd_PreviousItem': function(element) {
        Event.observe(element, 'click', function() {
            AppBehavior.ProfileCarousel.previous();
        });
    }
}

//EVENT OBSERVATION
AppBehavior.fireActiveCarouselLoaded = function(carousel) {
}
AppBehavior.fireActiveCarouselItem = function(carousel, element, item) {
    element.addClassName('selected');

   
}
AppBehavior.fireDeactiveCarouselItem = function(carousel, element, item) {
    element.removeClassName('selected');

    
}

AppBehavior.Load();
	
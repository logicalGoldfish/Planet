var actions = require('../actions/actions.js');
var request = require('superagent');
var Reflux  = require('reflux');
var makeUrl = require('make-url');
var api     = require('../utils/url-paths');
var userStore = require('./user.js');
// var exampleimg = './exampleimg.png'

var postItemStore = Reflux.createStore({

  listenables: [actions],
  data: {items: []},
  
  init: function() {
        // .bind('fileuploadstart', function(e){
        //   console.log('Upload started...');
        // })
        // .bind('cloudinarydone', function(e, data){
        //  if (e) {
        //   console.log('error on file upload', e);
        //  } else {
        //  console.log('Image upload done', data)
        //   return true;
        //  }
        // });

//enable cors on client side, disable cors. 
//tell server to send request to url, serve resource itself. 
  },

  onPostFormSubmitted: function(title, description, price, photos) {

    var userId = userStore.getProp('id');

    
      // .bind('cloudinarydone', function(e, data) {
      //   if (e) {
      //     console.log('cloudinary upload error', e);
      //   } else {
      //     console.log('success on cloudinary', data);
      //   }
      // // $('.thumbnails').append($.cloudinary.image(data.result.public_id, 
      // //   { format: 'jpg', width: 150, height: 100, 
      // //     crop: 'thumb', gravity: 'face', effect: 'saturation:50' } ))}

      // }).bind('cloudinaryprogress', function(e, data) { 
      //   if (e) {
      //     console.log('cloudinary upload error', e);
      //   } else {
      //     console.log('success on cloudinary', data);
      //   }
      // });

    request.post(makeUrl(api.items.create, {userId: userId}))
     .send({'title': title, 'description': description, 'beebucks': price, 'imageurl': 'https://res.cloudinary.com/dnfsudmqq/image/upload/v1425334340/hxyw7ryvrg13uemy5b9e.png'})
     .end(function(err, res) {
        if(err) {
            console.log("error on post: ", err)
        } else {
            
        $('#itemPostTitle').val("")
        $('#itemPostDescription').val("")
        $('#itemPostBeeBucks').val("")
        // $('#itemPostPhotos').val("")

       alert('Your item is now posted!');
        }
     });
    }
});

module.exports = postItemStore;
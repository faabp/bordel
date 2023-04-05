const db = {
    articles: [
      {
        id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        title: 'My article',
        content: 'Content of the article.',
        date: '04/10/2022',
        author: 'Liz Gringer'
      },
      // ...
    ],
    comments: [
      {
        id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        timestamp: 1664835049,
        content: 'Content of the comment.',
        articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        author: 'Bob McLaren'
      },
      {
        id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6c',
        timestamp: 1664835043,
        content: 'Content of the comment.',
        articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        author: 'Bob Rasovski'
      },
      // ...
    ]
   }
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {  
    res.send(db.articles)
});

//get article par id d'article
router.get('/:articleId', function(req, res, next) {  
  const searchId = req.params.articleId
  const article = db.articles.find( article => article.id === searchId)
  res.send(article)
});

//get comment par id d'article
router.get('/:articleId/comments', function(req, res, next) {  
  const searchId = req.params.articleId
  const comment = db.comments.find( comment => comment.articleId === searchId)
  res.send(comment)
});


//get comment par id d'article et id de comment
router.get('/:articleId/comments/:commentId', function(req, res, next) {  
  const searchId = req.params.articleId
  const searchcomId = req.params.commentId
  const comment = db.comments.find( comment => comment.articleId === searchId)
  const commentid = comment.find( author => author.id === searchcomId)
  res.send(commentId)
});

router.post('/', function(req, res, next) {  
    res.send(db.articles)
});


module.exports = router;

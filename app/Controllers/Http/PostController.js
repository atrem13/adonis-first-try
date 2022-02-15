'use strict'
const Post = use('App/Models/Post')
class PostController {
    async index({ request, response, view}) {
        const posts = await Post.all()
        return view.render('posts.index', {posts: posts.rows})
    }

    create({request, response, view}){
        return view.render('posts.create')
    }

    async store({request, response, view, session}){
        const post = new Post();
        post.title = request.input('title')
        post.content = request.input('content')

        await post.save()

      session.flash({ notification: 'New Post Added Successfully' })
      return response.route('posts.index')
    }

}

module.exports = PostController

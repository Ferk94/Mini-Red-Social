// const postExample = {
//   id: 1,
//   name: 'Fernando',
//   message: 'Tengo Frío',
//   date: Date.now(),
//   likes: 2
// }


const posts = []; 

exports.getAllPosts = (req, res) => {
  res.json(posts);
};

exports.getPostById = (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  console.log(post, 'post en backend de getPostById')
  post ? res.json(post) : res.status(404).send('Post no encontrado');
};

exports.createPost = (req, res) => {
  const newPost = { id: posts.length + 1, ...req.body, date: Date.now(), likes: 0 };
  posts.push(newPost);
  res.status(201).json(newPost);
};


exports.deletePost = (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Post no encontrado');
  const deleted = posts.splice(index, 1);
  res.json(deleted[0]);
};

exports.updateLike = (req, res) => {
  console.log('le pego al backend de updateLike?')
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  posts[index].likes = posts[index].likes === 1 ? 0 : 1;
  console.log(posts, 'posts en backend')
  res.json('likes actualizados')
}

// exports.getPostById = (req, res) => {
//   const index = posts.findIndex(p => p.id === parseInt(req.params.id));
//   if (index === -1) return res.status(404).send('Post no encontrado');
//   const post = posts[index];
//   res.json(post)
// }

export const userQuery = (userId) => {
    const query = `*[_type=="user" && _id == '${userId}']`;

    return query;
}

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            category,
            about,
            postedBy->{
              _id,
              userName,
              image
            },
            likes[]{
              _key,
              postedBy->{
                _id,
                userName,
                image
              },
            },
            comments[]{
              comment,
              _key,
              postedBy->{
                _id,
                userName,
                image
              },
            }
          }`;
  return query;
};

export const postQuery = (postId) => {
  const query = `*[_type == "post" && _id == '${postId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};


export const feedQuery = `*[_type == 'post'] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
  _id,
  title, 
  about,
  category,
  destination,
  postedBy->{
    _id,
    userName,
    image
  },
 likes[]{
    userId,
    _key,
    postedBy->{
      _id,
      userName,
      image
    },
  },
  comments[]{
    comment,
    _key,
    postedBy->{
      _id,
      userName,
      image
    },
  }
}`




export const userCreatedPostsQuery = (userId) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   likes[]{
      userId,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const userSavedPostsQuery = (userId) => {
  const query = `*[_type == 'post' && '${userId}' in likes[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    about,
    category,
    postedBy->{
      _id,
      userName,
      image
    },
    likes[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};
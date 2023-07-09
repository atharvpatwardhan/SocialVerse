import React, { useEffect, useState } from 'react'
import {AiFillHeart, AiOutlineHeart,AiOutlineDelete} from 'react-icons/ai'
import {BiCommentDetail} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import { client } from '../client';
import { v4 as uuidv4 } from 'uuid';
import {VscSend} from 'react-icons/vsc'
import { postQuery } from '../utils/userData';

export const Post = ({user,post}) => {

  // console.log(post);

  // console.log(user);

  const [curPost,setCurPost] = useState(post);
  const [showComments,setShowComments] = useState(false);
  const [liked,setLiked] = useState(false);
  const [comment,setComment] = useState('');
  const [comments,setComments] = useState(post?.comments?.length ? post?.comments  : null);
  const [commentCount,setCommentCount] = useState(post?.comments?.length)
  const [likeCount,setLikeCount] = useState(post?.likes?.length ? post?.likes?.length : 0);

  const isLiked1 = post?.likes?.filter((like)=>like?.postedBy?._id === user?._id)

  let alreadyLiked = post?.likes?.filter((like)=>like?.postedBy?._id === user?._id)?.length
  
  const navigate = useNavigate();

  const toggleShowComment = (e) => {
    e.stopPropagation();
    setShowComments(!showComments);
  }


  const navigateUserPage = (e) => {
    e.stopPropagation();
    navigate(`/user/${post.postedBy._id}`)
  }

  const likePost = (e) => {
    e.stopPropagation();


    if(!alreadyLiked){
      client
      .patch(post._id)
      .setIfMissing({likes : []})
      .insert('after','likes[-1]',[
        {
          _key : uuidv4(),
          userId : user?._id,
          postedBy : {
            _type : 'postedBy',
            _ref : user?._id
          },
        }
      ])
      .commit()
    }
    
  }

  const unLikePost = (e) => {
    e.stopPropagation();
    client
    .patch(post._id)
    .unset([`likes[userId == "${user?._id}"]`])
    .commit()
  }

  const addComment = () => {

    if(comments) {
      setComments([...comments, {comment, _key : uuidv4(), postedBy : { userName : user?.userName, image : user?.image, _id : user?._id }}]);
    }
    else{
      setComments([{comment, _key : uuidv4(), postedBy : { userName : user?.userName, image : user?.image, _id : user?._id }}])
    }

    setCommentCount(commentCount + 1);

    console.log(comments);


    if(comment){

      client
      .patch(post._id)
      .setIfMissing({ comments : [] })
      .insert('after','comments[-1]',[{ comment, _key : uuidv4(), postedBy : { _type : 'postedBy', _ref : user?._id }}])
      .commit()
      .then(()=>{
        setComment('');
        fetchPostDetails();
      })
    }
  }

  // const deleteComment = (key) => {
  //   client
  //   .patch(post._id)
  //   .unset([`comments[_key == "${key}"]`])
  //   .commit()
  // }


  const fetchPostDetails = () => {

    const query = postQuery(post._id);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setCurPost(data[0]);
        console.log('data : ',data);
      });
    }
  };

  const deletePost = () => {
    client
      .delete(post._id)
      .then(() => {
        window.location.reload();
      });
  };


  useEffect(()=>{

    fetchPostDetails();

    let alreadyLiked = post?.likes?.filter((like)=>like?.postedBy?._id === user?._id)?.length



    if(alreadyLiked){
      setLiked(true)
    }
    else{
      setLiked(false)
    }
  
  },[])
  

  return (
    <div className='border border-black rounded-md m-2'>
      <div className={`p-2 flex items-center gap-2 cursor-pointer`} onClick={(e)=>navigateUserPage(e)}>
        <img className='rounded-full h-8 w-8' src={post.postedBy.image} />
        <h1 className=''>{post.postedBy.userName}</h1>
      </div>
      <img className='w-full h-full' src={post.image.asset.url}/>
      <div className={`cursor-pointer flex justify-center gap-2 p-2 items-center`}>
        <div>
          {
            liked
            ?
            <AiFillHeart className='hover:scale-105 transition duration-500' color='red' size={30} onClick={(e)=>{unLikePost(e);setLiked(false);setLikeCount(likeCount-1);
            }} />
            :
            <AiOutlineHeart className='hover:scale-105 transition duration-500' size={30} onClick={(e)=>{likePost(e);setLiked(true);setLikeCount(likeCount+1);
            }} />
          }
          <p className='flex justify-center items-center'>{likeCount}</p>
        </div>
        <div>
          <BiCommentDetail className='hover:scale-105 transition duration-500' size={30} onClick={(e)=>{toggleShowComment(e)}} />
          <p className='flex justify-center items-center'>{commentCount ? commentCount : 0}</p>
        </div>
      </div>
      <div className='text-center p-2'>
        <p>{post.about}</p>
        <p className='font-semibold'>#{post.category}</p>
      </div>
      {
        post?.postedBy?._id === user?._id
        &&
        <div className='flex w-full justify-center items-center p-2 cursor-pointer hover:scale-105 transition duration-500'>
          <AiOutlineDelete onClick={deletePost} size={25} />
        </div>
      }
      {
        showComments &&

        <div className='p-4'>
        <div className='border-b'>
          Comments : 
        </div>
        <div>
          {comments?.map((c)=>(
            <div key={c._key} className='md:flex gap-2 items-center border-b'>
              <div className='flex gap-1 font-semibold'>
                <img src={c.postedBy?.image} className='rounded-full w-6 h-6'/>
                <p>{c.postedBy?.userName} :</p>
              </div>
              <div>
              <p className='p-2'>{c.comment}</p>
              </div>
              {/* {
                c.postedBy._id === user?._id

                ?

                <div className='flex justify-end'>
                  <button><MdDelete /></button>
                </div>
                :
                null
              } */}
            </div>
          ))}
        </div>

        <div className='flex gap-2 items-center justify-center'>
          <input type='text' value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Add a comment.' className='w-full h-10 p-2 border-b border-black rounded'></input>
          <button onClick={addComment} ><VscSend className='hover:scale-105 transition duration-100' size={20} /></button>
        </div>
      </div>

      }

    </div>
  )
}

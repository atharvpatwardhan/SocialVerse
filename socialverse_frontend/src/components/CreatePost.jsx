import React, { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { client } from '../client';
import { MdDelete } from 'react-icons/md';
import { categories } from '../constants/categories';
import HashLoader from 'react-spinners/HashLoader';

export const CreatePost = ({user}) => {

  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();



  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Upload failed:', error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const savePost = () => {
    if (about && imageAsset?._id && category) {
      const doc = {
        _type: 'post',
        about,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
        category,
      };
      client.create(doc).then(() => {
        setTimeout(navigate('/'),3000);
      });
    } else {

      setFields(true);

      setTimeout(
        () => {
          setFields(false);
        },
        2000,
      );
    }
  };

  return (
    <div className='flex flex-col'>
      <h1 className='w-full text-center p-14 text-4xl text-red-600 font-semibold'>Create a new post</h1>
      <div className='flex justify-center items-center h-full'>
        <div>
          {
            !imageAsset
            ?
            <label>
              {
                loading 
                ?
                <div className='flex justify-center items-center h-screen'><HashLoader color="#dc2626" /></div>
                :
                <div>
                <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-20 cursor-pointer">
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold text-2xl">
                    <AiOutlineCloudUpload size={50} />
                  </p>
                  <p className="text-3xl">Click to upload</p>
                </div>

                <p className="mt-10 text-gray-400">
                  Supported File types: JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
                </p>
              </div>
              <input
                type="file"
                name="upload-image"
                onChange={uploadImage}
                className="w-0 h-0"
              />
              </div>
              }

              </label>   

              :

              <div className="md:p-0 px-20">
              <img
                src={imageAsset?.url}
                alt="uploaded-pic"
                className="max-w-xl md:max-w-4xl rounded-2xl shadow-2xl"
              />
              <button
                type="button"
                className="bottom-3 right-3 p-3 m-3 rounded-full shadow-2xl bg-red-600 text-xl cursor-pointer outline-none hover:scale-90 transition duration-500 ease-in-out"
                onClick={() => setImageAsset(null)}
              >
                <MdDelete />
              </button>
              </div>

          }
        </div>
      </div>
      <div className='w-full flex justify-center items-center my-5'>
        <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Caption"
            className="flex shadow-2xl justify-center rounded-xl items-center w-[69%] text-base sm:text-lg border border-black p-2"
          />
      </div>

      <div className="flex flex-col justify-center items-center">
            <div className='w-[50%] flex gap-5 justify-center items-center my-5'>
              <p className="mb-2 font-semibold text:lg sm:text-2xl">Category</p>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="outline-none w-52 text-xl  border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="others" className="sm:text-bg bg-white">Select Category</option>
                {categories.map((item) => (
                  <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
      </div>


      <div className="flex justify-center items-center mt-5">
              <button
                type="button"
                onClick={savePost}
                className="bg-red-600 text-white font-bold p-3 rounded-full w-28 mb-5 outline-none shadow-2xl hover:scale-90 transition duration-500"
              >
                Create Post
              </button>
      </div>
    </div>
  )
}

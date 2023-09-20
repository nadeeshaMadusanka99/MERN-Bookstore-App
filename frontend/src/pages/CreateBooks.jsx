// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title, author, publishYear
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created Successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar('An error occured.', { variant: 'error' })
        console.log(err);
      });
  };
  return (
    <div  className=" p-5 bg-blue-100 min-h-screen text-sky-950 font-mono">
      <BackButton />
      <h1 className='text-3xl my-4 font-mono'>Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type = 'text'
            value ={title}
            onChange = {(e) => setTitle(e.target.value)}
            className='border-2 rounded-lg border-sky-500 px-4 py-2 w-full bg-transparent'
          /> 
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type = 'text'
            value ={author}
            onChange = {(e) => setAuthor(e.target.value)}
            className='border-2 rounded-lg border-sky-500 px-4 py-2 w-full bg-transparent'
          /> 
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type = 'text'
            value ={publishYear}
            onChange = {(e) => setPublishYear(e.target.value)}
            className='border-2 rounded-lg border-sky-500 px-4 py-2 w-full bg-transparent'
          /> 
        </div>
        <button className='p-2 bg-sky-300 m-8 rounded-xl font-bold text-xl' onClick={handleSaveBook}>
          Save
        </button>
      </div>

    </div>
  )
}

export default CreateBooks
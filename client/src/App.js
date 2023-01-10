import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css';
import Swal from "sweetalert2";

const App = () => {
  const [movieName, setMovieName] = useState('');
  const [movieReview, setmovieReview] = useState('');
  const [movieReviewList, setmovieReviewList] = useState([]);

  useEffect(() => {
    getData();
  },[]);

  const getData = async () => {
    Axios.get("http://localhost:3001/api/getData").then((response) => {
    // Axios.get("http://192.168.221.120:3001/api/getData").then((response) => {
      setmovieReviewList(response.data);
    });
  }

  const submitReview = (e) => {
    e.preventDefault();
    if (movieName.trim().length !== 0 && movieReview.trim().length !== 0) {
      Axios.post("http://localhost:3001/api/insert", {
        moviename: movieName, 
        moviereview: movieReview
      }).then(() => {
        Swal.fire(
          'Save!',
          'Your data has been saved.',
          'success'
        );
        setMovieName('');
        setmovieReview('');
      });
      setmovieReviewList([
        ...movieReviewList,
        {moviename: movieName, moviereview: movieReview}, 
      ]);
    } else {
      Swal.fire(
        'Warning!',
        'Empty fields.',
        'error'
      );
    }
  };

  const deleteReview = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/api/delete/${id}`).then(() => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        getData();
        });
      }
    });
  };

  return (
    <div className="App">
      <h1>Sample Form</h1>
      <hr />

      <div className='form'>
        <label>Name</label>
        <input type="text" name="movieName" value={movieName} onChange={(e) => setMovieName(e.target.value)} />
        <label>Review</label>
        <input type="text" name="movieReview" value={movieReview} onChange={(e) => setmovieReview(e.target.value)} />

        <button onClick={submitReview}>Save Changes</button>

        {movieReviewList.map((val) => {
          return (
            <div className="card" key={val.id}>
              <h1>{val.moviename}</h1>
              <p>{val.moviereview}</p>

              <button className='delete' onClick={() => {deleteReview(val.id)}}>Delete</button>
              <button className='update'>Update</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;

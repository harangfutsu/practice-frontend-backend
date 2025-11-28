import { useSelector, useDispatch } from "react-redux";
import { fetchMe } from "../store/redux/userReducer"
import { useEffect } from "react";

const Profile = () => {
  const dispatch = useDispatch();

  const {currentUser, isLoading, isError} = useSelector((state) => state.user)
  console.log('data currentUser:', currentUser)

    useEffect(() => {
    dispatch(fetchMe()); // ambil data berdasarkan filter
  }, []); // jika filter berubah, ambil ulang data


  return (
    <div>
      <h2>Profile</h2>
      {isLoading && (<p>Loading</p>)}
      {isError && (<p>Error</p>)}
      {!isLoading && !isError && (<div><p>Sukses</p>
      <form action="">
      <input value={currentUser.fullname} type="text" />
      <br />
      <input value={currentUser.email} type="text" />
      <br />
      <input value={currentUser.gender} type="text" />
      <br />
      <input value={currentUser.country} type="text" />
      <br />
      <input value={currentUser.phone} type="text" />
      </form>
      </div>)}
    </div>
  );
};

export default Profile;

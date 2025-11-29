import { useSelector, useDispatch } from "react-redux";
import { fetchMe, updateUserData } from "../store/redux/userReducer";
import { useEffect, useRef } from "react";

const Profile = () => {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const { currentUser, isLoading, isError } = useSelector(
    (state) => state.user
  );

  // 1️⃣ Fetch data user
  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  // 2️⃣ Isi form SETELAH fetchMe selesai
  useEffect(() => {
    if (!currentUser || !formRef.current) return;

    formRef.current.fullname.value = currentUser.fullname || "";
    formRef.current.email.value = currentUser.email || "";
    formRef.current.gender.value = currentUser.gender || "";
    formRef.current.country.value = currentUser.country || "";
    formRef.current.phone.value = currentUser.phone || "";
    formRef.current.password.value = currentUser.password; // ⚠️ jangan auto isi password
    formRef.current.verification.value = currentUser.password;

  }, [currentUser]);

  return (
    <div>
      <h2>Profile</h2>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}

      {!isLoading && !isError && (
        <form onSubmit={(e) => {
          e.preventDefault()
          dispatch(updateUserData({id : currentUser.user_id, payload: {
            fullName: e.target.fullname.value,
            email: e.target.email.value,
            gender: e.target.gender.value,
            country: e.target.country.value,
            phone: e.target.phone.value,
            password: e.target.password.value
          }}))

        }} ref={formRef}>
          <input name="fullname" type="text" />
          <br />
          <input name="email" type="text" />
          <br />
          <select name="gender" id="gender">
            <option value="Pria">Pria</option>
          </select>
          <br />
          <select name="country" id="country">
            <option value="+62">+62</option>
          </select>
          <br />
          <input name="phone" type="number" />
          <br />
          <input name="password" type="password" />
          <br />
          <input name="verification" type="password" />
          <br />
          <button type="submit">Simpan</button>
        </form>
      )}
    </div>
  );
};

export default Profile;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Nav from "../components/Nav.jsx";

function OnBoarding() {
  let navigate = useNavigate();
 /* Creating a state object with the initial values. */
 const [cookies, setCookie, removeCookie] = useCookies(null)
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: "",
        dob_day: "",
        dob_month: "",
        dob_year: "",
        show_gender: false,
        gender_identity: "man",
        gender_interest: "woman",
        url: "",
        about: "",
        matches: []

    })


  const handlerSubmit = async (e) => {
    console.log('submitted')
    e.preventDefault()
    try {
        const response = await axios.put('http://localhost:8080/user', {formData})
        console.log(response)
        const success = response.status === 200
        if (success) navigate('/dashboard')
    } catch (err) {
        console.log(err)
    }

}

  const handlerChange = (e) => {
    
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;
 

    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))
  };


  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="onboarding">
        <h2>create account</h2>
        <form onSubmit={handlerSubmit}>
          <section>
            <label htmlFor="first_name">First name </label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First name"
              required={true}
              value={formData.first_name}
              onChange={handlerChange}
            />
            {/* BIRTHDAY */}
            <label>BirthDay</label>
            <div className="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handlerChange}
              />
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handlerChange}
              />
              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handlerChange}
              />
            </div>
            {/* GENDER */}
            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="woman-gender-indetify"
                type="radio"
                name="gender-indetify"
                placeholder="gender"
                value={"female"}
                onChange={handlerChange}
              />
              <label htmlFor="woman-gender-indetify">Female </label>
              <input
                id="man-gender-indetify"
                type="radio"
                name="gender-indetify"
                placeholder="gender"
                value={"male"}
                checked = {formData.gender_identify === 'man'}
                onChange={handlerChange}
              />
              <label htmlFor="man-gender-indetify">Male</label>
              <input
                id="more-gender-indetify"
                type="radio"
                name="gender-indetify"
                placeholder="gender"
                value={"more"}
                
                onChange={handlerChange}
              />
              <label htmlFor="more-gender-indetify">More</label>
            </div>
            <label htmlFor="show-gender">Show gender on my profile</label>
            <input
              id="show-gender"
              type="checkbox"
              name="show_gender"
              placeholder="gender"
             
              onChange={handlerChange}
            />
            {/* INTEREST */}
            <label>Show Me</label>
            <div className="multiple-input-container">
              <input
                id="woman-gender-interest"
                type="radio"
                name="gender-interest"
                placeholder="gender"
                checked = {formData.gender_interest === 'woman'}
                value={"woman"}
                onChange={handlerChange}
              />
              <label htmlFor="woman-gender-interest">Woman </label>
              <input
                id="man-gender-interest"
                type="radio"
                name="gender-interest"
                placeholder="gender"
                value={"man"}
                
                onChange={handlerChange}
              />
              <label htmlFor="man-gender-interest">Man</label>
              <input
                id="everyone-gender-interest"
                type="radio"
                name="gender-interest"
                placeholder="gender"
                value={"everyone"}
               
                onChange={handlerChange}
              />
              <label htmlFor="everyone-gender-interest">Everyone</label>
            </div>

            <label htmlFor="about">about me</label>

            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like pets and I am a big fan of dogs"
              value={formData.about}
              onChange={handlerChange}
            />
            <input type="submit" />
          </section>
          {/* PROFILE IMAGE  */}
          <section>
          <label htmlFor="about">Profile Photo</label>
          <input type="url" name="url" id="url" onChange={handlerChange} required />
          <div className="photo-container">
            <img src={formData.url} alt="profile pic preview" />
          </div>
          </section>
        </form>
      </div>
    </>
  );
}

export default OnBoarding;

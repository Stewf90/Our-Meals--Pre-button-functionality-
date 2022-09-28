import { db } from "./firebase.config"
import { storage } from "./firebase.config"
import { useState, useEffect, useRef } from "react"
import { collection, onSnapshot, doc, addDoc } from "firebase/firestore"
// import emailjs from '@emailjs/browser';
import './App.css';

function App() {
const choicesColRef = collection(db, "choices")
const mealsColRef = collection(db, "meals")
useEffect(() => {
  onSnapshot(mealsColRef, snapshot => {
    setMeals(snapshot.docs.map(doc => {
      return {
        id: doc.id,  
         name:doc.data().name,
         calories:doc.data().calories,
         ingredients:doc.data().ingredients,
         source: doc.data().source,
         image:doc.data().image
      }
    }))
  })
}, [])
useEffect(() => {
  onSnapshot(choicesColRef, snapshot => {
    setChoices(snapshot.docs.map(doc => {
      return {
        id: doc.id,
         name:doc.data().name,
         source:doc.data().source,
         ingredients:doc.data().ingredients,
         
      }
    }))
  })
}, [])

//constant variables and functions

  const [meals, setMeals] = useState([])
  const [choices, setChoices] = useState([])
  const ingredientPlace = useRef(null)
  const [addIngredient, setAddIngredient] =useState('')
  const [ingredients, setIngredients] = useState([])
  const [form, setForm] = useState({
    name: "",
    calories: 0,
    ingredients: [],
    source:"",
    image: null
  })
  const [popupActive, setPopupActive] = useState(false)
  const [popupActive2, setPopupActive2] = useState(false)
  const handleSubmit = e => {
    e.preventDefault()

    if (
      form.name === "" ||
      form.calories === 0 ||
      form.ingredients === [] ||
      form.source === "" ||
      form.image === ""
    ) 
    {
      alert("Please fill the fields")
      return
    }

    addDoc(mealsColRef, form)

    setForm({
      name: "",
      calories: 0,
      ingredients: [],
      source: ""
      //image: null
    })



    // setImageForm({
    //   image: null
    // })
  
  }

  // function addToList() {
    
  //   document.getElementById("mealIngredients");
  // }



  const handleIng = () => {
    setForm({
      ...form,
      ingredients: [...form.ingredients, ""]
    })
  }

  const handleAdd= (e, i) => {

    const ingredientsCopy = [...form.ingredients]
    ingredientsCopy[i] = e.target.value
    setForm({...form, ingredients:ingredientsCopy})
  }

  const handleAddToList = () => {
    document.getElementById("choicesName").innerHTML = form.name.value
    document.getElementById("choicesList").innerHTML = form.ingredients.value
 
  }
  return (
    <div className="App">
      
      <nav>
     <h1><button onClick={() => setPopupActive(!popupActive)} className="add">Add Meal</button>Our Meals
     <button onClick={() => setPopupActive2(!popupActive2)} className="show">Show Selections</button></h1>
     </nav>
     {popupActive && <div className="addPop">
      
      <div className="addLayout"></div>
      <h2>Add a meal</h2>
      <form onSubmit={handleSubmit}>
      <br></br>
        <div className="formTitle">
        <label>
          <span>Meal name:</span>
          <input
          type="text"
          value ={form.name} onChange= {e => setForm({...form, name:e.target.value})}
          required
          />
        </label>
          </div>


        <div className="formTitle">
        <label>
          <span>Calories:</span>
          <input
          type="number"
          value ={form.calories} onChange= {e => setForm({...form, calories:e.target.value})}
          required
          />
        </label>
          </div>
        <br></br>
        <div className="form">
        <label>
          <span className="formTitle">Ingredients:</span>
          {
          form.ingredients.map((ingredient, i) => (
          <input
          type="text"
          key={i}
          value ={ingredient} onChange= {e => handleAdd(e, i)}
          required
          />
          ))
          }
          <button type="button" onClick={handleIng}>Add ingredient</button>
        </label>

          </div>
        
          <div className="formTitle">
        <label>
          <span>Link to recipe:</span>
          <input
          type="text"
          value ={form.source} onChange= {e => setForm({...form, source:e.target.value})}
          
          />
        </label>
          </div>

          <br></br>
        <div className="formTitle">
        <label for="image">Choose file to upload:</label>
       <input type="file" className="mealPic" name="image"
          accept=".jpg, .jpeg, .png"
            value ={form.image} onChange= {e => setForm({...form, image:e.target.value})}
            required
            />
            <br></br>
            <button className="send">Submit</button>
            </div>
      </form>

      
    </div>}

 {/* This is for the selections button popup vvvv  */}

<div className="App">


{popupActive2 && <div className="showPop">
{choices.map((choice, c) => (
  <div className="choices" key={choice.id}>
    
    <h2 className="mealName">{choice.name}</h2>
    

    
    
    
    <br></br>
    <h3>Ingredients for this meal: </h3>
    <ul id="choicesList">


      {choice.ingredients.map((ingredient, i) => (
        <li key={i}>{ingredient}</li>
    )
    )}
    <br></br>
     </ul>
     
</div>

))}
<br></br>
<form ref={form} onSubmit={handleSubmit}>

<div className="form">
<label className="formTitle">

      <label>Email</label>
      <input type="email" name="user_email" />
     

  

</label>
  </div>
  
  </form>
  <button onClick={() => setPopupActive2(!popupActive2)} className="send">Send meal ingredients</button>
   </div>  
}

   </div>
     
     {/*Selections button popup code ends here*/}
   
    {/* Main meals feed starts here vvvv */}
     <div className="meals">

      {meals.map((meal, m) => (
        <div className="meal" key={meal.id}>
          
          <h2 className="mealName">{meal.name}</h2>
          <br></br>
          <img src= {meal.image}></img>
          <br></br>
          <h3>Recipe link:</h3>
          <p><a className="recipeLink"href={meal.source}>Link (if one is provided)</a></p>
          <br></br>
          <h3>Nutritional information: </h3>
          <p> This meal is {meal.calories} calories</p>
          <br></br>
          <h3>Ingredients for this meal: </h3>
          <ul> 
            {meal.ingredients.map((ingredient, i) => (
              <li key={i}>{ingredient}</li>
          )
          )}
          <br></br>
           </ul>
           <button type="button" onClick={handleAddToList} className="list">Add to List</button>
           <br></br>
           <br></br>
           <button type="button" className="remove">Remove from Selection</button>
      </div>
      
    ))}
     </div>
     {/* Main meal feed ends here */}

  

    

    </div>

     
    



   
  );
}



export default App;
let container = document.getElementById("container");
let btn = document.getElementById("btn");
let titleInput = document.getElementById("title");
let priceInput = document.getElementById("price");
let descriptionInput = document.getElementById("description");
let categoryInput = document.getElementById("category")
let ratingInput = document.getElementById("rating");
let imageUrlInput = document.getElementById("imageURL");
let idInput = document.getElementById("id");
let url = "https://distinct-safe-cobalt.glitch.me/products";


let inputs = document.querySelectorAll("input");


inputs.forEach(input => {
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {  
            event.preventDefault();  
            btn.click();  
            
        }
    });
});


btn.addEventListener("click", async function () {    

    let loading = document.getElementById("loading");
  
    if (title.value == "" || price.value == "" || description.value == ""||rating.value==""||category.value==""|| imageURL.value == "") {
        alert("Enter data properly");
        return;
    }

    if (rating.value > 5) {
        alert("Enter rating between 0 -5");
        return;
        
    } 

    

        let method = idInput.value ? "PUT" : "POST";
        let mainUrl = (method == "PUT") ? `${url}/${idInput.value}` : url;

        loading.style.display = "inline-block";
        setTimeout(async () => {
        try{

            let response = await fetch(mainUrl, {
                method,
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({
                    "title": titleInput.value,
                    "price": priceInput.value,
                    "description": descriptionInput.value,
                    "image":imageUrlInput.value,
                    "rating":ratingInput.value,
                    "category":categoryInput.value,
                })
            });
            if (response.ok) {
                getData();
                alert((method == "PUT") ? "Data Updated" : "Data Added");
            }
        } catch (err) {
            console.error(err);
        } finally{
            loading.style.display = "none";
        }
    }, 2000);
});


    // else {
    //     let options = {
    //         "method": "POST",
    //         "headers": {
    //             "Content-Type": "application/json"
    //         },
    //         "body": JSON.stringify({
    //             "title": title.value,
    //             "price": price.value,
    //             "description": description.value,
    //             "rating":rating.value,
    //             "category":category.value,
    //             "image": imageURL.value,
                
            
    //         })
    //     }
    //     fetch("http://localhost:8000/products", options)
    //         .then(res => {
    //             if (res.ok) {
    //                 title.value = '';
    //                 price.value = '';
    //                 description.value = '';
    //                 rating.value='';
    //                 category.value='';
    //                 imageURL.value='';
                    
                 
    //                 getData(); // mandatory
    //                 alert("Data Added");
    //             }
    //         })
    // }


// function getData() {
//     fetch("https://kaput-midi-temperature.glitch.me/products")
//         .then(res => res.json())
//         .then(data => displayData(data));
// }

async function getData(){
    try{
        let response = await fetch(url);
        let data = await response.json();
        if(response.ok){
            displayData(data);
        }
        console.log(data);
    }catch(err){
        console.error(err);
    }
}


function displayData(products) {

    container.innerHTML = ``; // mandatory
    console.log(products)
    products.forEach(obj => {
        let item = document.createElement("div");
        item.className="item";
        item.innerHTML = `
            <img src="${obj.image}" class="image">
            <p class="title">${obj.title}</p>
            <p class="price">${obj.price}</p>
            <p class="description">${obj.description}</p>
            <p class="rating">⭐ ${obj.rating.rate}</p>                              
            <p class="category">${obj.category}<P>
            <button onclick = deleteData('${obj.id}')>Delete</button>
            <button onclick = updateData('${obj.id}')>Update</button>
        `;
  
        
        container.appendChild(item);
    })
}

// function deleteData(id) {
//     console.log(id)
//     let options = {
//         "method": "DELETE"
//     }
//     fetch(`http://localhost:8000/products/${id}`, options)
//         .then(res => {
//             if (res.ok) {
//                 getData(); // mandatory
//                 alert("Data Deleted");
//             }
//         })
//         .catch(err => console.error(err));
      
// }

async function updateData(id){
try{
    let response = await fetch(`${url}/${id}`);
    

        let obj = await response.json();
        titleInput.value = obj.title;
        priceInput.value = obj.price;
        descriptionInput.value = obj.description;
        categoryInput.value = obj.category;
        ratingInput.value = obj.rating.rate;
        imageUrlInput = obj.image;
        idInput.value = obj.id;

        window.scroll({
            top: 0,
            behavior: "smooth"
        });

}
catch(err){
    console.error(err)
}

}

async function deleteData(id){
    try{
        
        let response = await fetch(`${url}/${id}`, {"method":"DELETE"})
       
        if(response.ok){
            getData();
            alert("Data Deleted")

        }
    }
    catch(err){
        console.error(err)
    }
}
getData();
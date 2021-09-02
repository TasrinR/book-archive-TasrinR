const searchBook = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResults(data));
}

const displaySearchResults = books => {
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';
    if(books.docs.length===0){
        const totalResult = document.getElementById('total-result');
        totalResult.innerHTML = '';
        const div = document.createElement('div');
        div.innerText = `no result found, try different words`;
        totalResult.appendChild(div);
    }
    else{
        const totalResult = document.getElementById('total-result');
        totalResult.innerHTML = '';
        const div = document.createElement('div');
        div.innerText = `total number of results ${books.docs.length}`;
        totalResult.appendChild(div);

        books.docs.forEach(book =>{
        console.log(book);
        const div = document.createElement('div');
            const imgURL = book.cover_i?` https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`:'js/image.png';
            div.classList.add('col-md-6', 'col-lg-4');
            div.classList.add('text-dark', 'mb-3');
            div.innerHTML = `
                <div class="card" style="min-height: 100%">
                    <div class="row g-0">
                        <div class="col-md-4 d-flex justify-content-center align-items-center">
                            <img src="${imgURL}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${book.title}</h5>
                                <p class="card-text d-inline"><i>by <h6 class="d-inline"> ${book.author_name?book.author_name[0]:'author name not available'}</h6></i></p>
                                <p class="card-text"><small class="text-muted">Publisher: ${book.publisher?book.publisher[0]:'No publisher found'} </small></p>
                                <p class="card-text"><small class="text-muted">First publish year: ${book.first_publish_year}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            `

        
    searchResult.appendChild(div);
    })}
}

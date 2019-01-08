export default class Livro{
    isbn;
    title;
    authors;
    description;
    imgUrl;

    constructor(isbn, title, authors, description, imgUrl){
        this.isbn = isbn;
        this.title=title;
        this.authors=authors;
        this.description=description;
        this.imgUrl = imgUrl
    }
}

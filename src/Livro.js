export default class Livro{
    isbn;
    title;
    authors;
    description;
    imgUrl;
    editora;
    quantidade;

    constructor(isbn, title, authors, description, imgUrl, editora, quantidade){
        this.isbn = isbn;
        this.title=title;
        this.authors=authors;
        this.description=description;
        this.imgUrl = imgUrl;
        this.editora = editora;
        this.quantidade = quantidade;
    }
}

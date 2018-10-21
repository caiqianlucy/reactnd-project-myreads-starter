import React, {Component} from 'react';
import {getAll} from '../BooksAPI'
export const MyContext=React.createContext();

export default class index extends Component{
  async componentDidMount(){
    try {
      const books= await getAll();
         this.state.addBooks(books);
    } catch(error){
      console.log(error);
    }
  }
  constructor(){
    super();
    this.state={
      books:[],
      currentlyReading:[],
      wantToRead:[],
      read:[],
      addBooks: books=>{
        const currentlyReading=books.filter(book=>book.shelf==='currentlyReading');
        const read=books.filter(book=>book.shelf==='read');
        const wantToRead=books.filter(book=>book.shelf==='wantToRead');
        this.setState({books, currentlyReading, wantToRead, read});
      },
      moveBook:(book, newShelf, allShelves)=>{
              const newBooks=this.state.books.map(allBooks=>{
                const matchID=allShelves[newShelf].find(bookID=>
                bookID===allBooks.id);
                if(matchID){
                  allBooks.shelf=newShelf;
                }
                return allBooks;
              });
              this.state.addBooks(newBooks);
      }
      }
    }

 render(){
   return (
     <MyContext.Provider value={this.state}>
       {this.props.children}
     </MyContext.Provider>
   )
 }

}

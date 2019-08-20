# Shelf Life

Browse your personal library, add new books, and keep track of who borrowed books when.

Check it out here: LINK PENDING

![bookdetails](src/img/bookdetails.png)

## Resources

### APIs
- [Open Library Books API](https://openlibrary.org/dev/docs/api/books)

### Technologies Used
- React (Hooks)
- Typescript
- Node.js
- React Bootstrap
- Axios
- MongoDB

## Planning

I used a Trello board to manage tasks. Check it out [here](https://trello.com/b/FHCqVpD1/shelf-life) 

### Spec Sheet
![specs](src/img/SpecSheet.png)

### Models
![models](src/img/shelflifemodels.png)

### Routes
|METHOD| ROUTE| FUNCTION|
|:-----|:----:|:------:|
| POST | `/auth/signup` | creates a user profile and associated library |
| POST | `/auth/login` | logs user into profile, if alreacy created |
| POST | `/auth/me/from/token` | gets token from local storage, if present, and logs user in |
| GET  | `/api/library/:id` | gets user's library and all associated books |
| GET  | `/api/loan/:lid/:bid` | gets all loan data associated with a user's book |
| GET  | `/api/notes/:lid/:bid` | gets all notes associated with a user's book  |
| POST | `/api/library/book` | creates a book if new, and adds to a user's library |
| POST | `/api/library/loan`  | creates a record of a loan for a user's book  |
| POST | `/api/library/notes` | creates a note associated with a user's book  |
| PUT | `/api/library:id` | checks in a user's book that was loaned out |
| DELETE | `/api/library/:lid/:bid` | removes a book from a user's library |

## Thoughts

- Typescript was a challenge, particularly when integrating it into React with Hooks, to which I really only had a cursory introduction.  All the planning I did at the beginning helped a lot, though I don't have everything implemented to the degree I'd like. This project leaves a lot of room for growth and added features, and I look forward to seeing what I can include going forward.

## Future Additions!
- [ ] A barcode reader! While not all books have their ISBN in the barcode, most books since 2001 do, so searching by taking a picture of the barcode and using the data to query the api would be amazing.
- [ ] Custom tagging of books. I have maybe 12 different versions of a kids book, being able to just find those by searching the library would be helpful
- [ ] User library seraches. It would be interesting to search by book and see the libraries of other users that have the same books as you and what things they might have that you don't.

## Screenshots

### Library Filter
![libraryfilter](src/img/libraryfilter.png) ![booksearch](src/img/booksearch.png)
![bookloan](src/img/bookloan.png) ![booknotes](src/img/booknotes.png)
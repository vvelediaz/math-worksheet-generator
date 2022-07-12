import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";

// function App() {
//   return (
//     <div>
//       <button type="button" className="btn btn-primary" id="download-btn">Download</button>
//     </div>
//   );
// }
function App(){

    return(
        <div className="full-page overflow-auto">
            <Header />

            <Main />
        </div>
    )

}

export default App;

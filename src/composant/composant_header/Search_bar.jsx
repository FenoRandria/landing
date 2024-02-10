import { useState } from "react";
const Search_bar = () => {
    return (
        <div className ="recherche">
            <form action="recherche" method="get">
                <input type="text" name="keyword" id="search" placeholder="Votre Recherche"/>
                <button>
                    <img src="  /img/btnSearchnoneFOnd.png" alt=""/>
                </button>
            </form>
        </div>
    )
}
export default Search_bar;
import React from 'react';
import NavBar from '../components/NavBar';
import { MdDelete } from 'react-icons/md';

function Logs() {

    const itemDelete = () => {
        alert("Item Deleted.")
    }


    return (
        <div>
            <NavBar />
            <h1>Logs Page</h1>
            <table>
                <tr>
                    <th>Entry Name</th>
                    <th><MdDelete /></th>
                </tr>
                <tr>
                    <td>Log # 1</td>
                    <td><MdDelete onClick={() => {
                        const verify = window.confirm("Do you want to delete this Item?")
                        if (verify) {
                            itemDelete()
                        } else {
                            alert("Item was not deleted")
                        }
                    }}
                    /></td>
                </tr>
                <tr>
                    <td>Log # 2</td>
                    <td><MdDelete onClick={() => {
                        const verify = window.confirm("Do you want to delete this Item?")
                        if (verify) {
                            itemDelete()
                        } else {
                            alert("Item was not deleted")
                        }
                    }} /></td>
                </tr>

            </table>
        </div>
    )
}

export default Logs;
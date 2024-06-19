import { useState } from "react"
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
export default function(){

    const [list, setList] = useState(["Test", "Prova"]);
    const [title, setTitle] = useState('');
    const [active, setActive] = useState(false);
    const [edit, setEdit] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setList([...list, title]);
        setTitle('');
    }
    const deleteElement = (index) => {
        setList(list.filter((el, i) => i!== index))
    }

    const handleEdit = (index, bool) => {
        setActive(bool);
        setEdit(index);
    }


    return(
        <div>
            <h1>Create a new Article</h1>
            {
                !active && 
                    <div className="create">
                        <form onSubmit={handleSubmit}>
                            <label>Insert title: </label>
                            <input type="text"
                            value={title}
                            required
                            onChange={ e => setTitle(e.target.value)}
                            />
                            <button type="submit"> Crea </button>
                        </form>

                    </div>
            }
            <h2>Created Articles</h2>
            <div className="index">
                <div className="show">
                    <ol>
                        {list.map((item, index) => 
                        <li key={index}>
                            <span>{item}</span>
                            <div>
                                <MdModeEdit 
                                color="blue"
                                onClick={() => handleEdit(index, true)}/>
                                <MdDeleteForever 
                                color="red"
                                onClick={() => deleteElement(index)}/>
                            </div>
                        </li>)}
                    </ol>
                </div>
                {active && 
                    <div className="edit">
                        <form >
                            
                        </form>
                        <label>New title:</label>
                        <input type="text"
                        placeholder={list[edit]}
                        onChange={ e => setTitle(e.target.value)}
                        />
                    </div>
                }
            </div>
        </div>
    )
}
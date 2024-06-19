import { useEffect, useState } from "react"
import { MdDeleteForever } from "react-icons/md";
export default function(){

    const categories = ["Food", "Drink", "Travel", "Sports", "Other"];
    const tags = [ "travel", "food", "fitness", "photography", "technology", "health", "fashion", "lifestyle", "nature", "art"];

    const [list, setList] = useState([]);
    const [published, setPublished] = useState(false);

    const initialData = {
        title: '',
        content: '',
        image: '',
        category: [""],
        tags: [],
        published: false
    }

    const [formData, setFormData] = useState(initialData);

    const handleField = (name, value) => {

        setFormData(curr => ({
            ...curr,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        setList(curr => ([...curr, formData]));
        setPublished(curr => !curr);
        setFormData(initialData);
    }

    useEffect(() => {
        if (published) {
        alert("Post created")
        }
    }, [published]);

    return (<>

        <h1>Create a new Post</h1>
    
        <form onSubmit={handleSubmit} className="create">
            {Object.keys(initialData).map((name, index) => {
                const value = initialData[name];
                if (name === "category") {
                    return (
                        <label key={`formElement${index}`}>
                            {name}:
                            <select
                            name={name}
                            value={formData[name]}
                            onChange={(e) => handleField(name, e.target.value)}>

                                {categories.map((name, index) => (
                                    <option value={name}>{name}</option>
                                ))}
                            </select>
                        </label>
                    );
                }
                switch(typeof value){
                    case 'boolean':
                    return (
                        <label key={`formElement${index}`}>
                            {name}
                            <input
                                name={name}
                                type="checkbox"
                                checked={formData[name]}
                                onChange={(e) => handleField(name, e.target.checked)}
                            />
                        </label>
                    )
                    case 'object':
                    return (
                        <div key={`formElement${index}`} className="tags">
                            <p>Tags:</p>
                            <ul>
                                {tags.map((name, index) => (
                                    <li key={`ingredient${index}`}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={formData.tags.includes(name)}
                                                onChange={() => {
                                                    const curr = formData.tags;
                                                    const newTags = curr.includes(name) ? 
                                                    curr.filter(el => el !== name) : 
                                                    [...curr, name];
                                                    handleField('tags', newTags);
                                                }}
                                            />
                                            {name}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                    default:
                    return (
                        <label key={`formElement${index}`}>
                            {name}:
                            <input
                                name={name}
                                type={typeof value === 'number' ? 'number' : 'text'}
                                value={formData[name]}
                                onChange={(e) => handleField(name, typeof value === 'number' ? Number(e.target.value) : e.target.value)}
                            />
                        </label>
                    )
                }
            })}
            <button>Salva</button>
        </form>

        <div className="show">
            {list.map( (p, index) => (
                <div key={`listElement${index}`} className="postCard" >
                    <h2>{p.title}</h2>
                    <p>{p.content}</p>
                    <figure>
                        <img src={p.image} alt=""/>
                    </figure>
                    <p>Categoria: {p.category}</p>
                    <p>Tags: {p.tags.join(', ')}</p>
                    <p className={p.published?"publ":"notPubl"}>{p.published? 'Pubblicato' : 'Non pubblicato'}</p>
                    <button className="delete" onClick={() => setList(curr => curr.filter(el => el!== p))}>
                        <MdDeleteForever/>
                    </button>
                </div>
                
            ))}
        </div>
    
    </>);
}
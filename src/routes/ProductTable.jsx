import classes from './ProductTable.module.css'

import { useState, useEffect } from 'react'

export default function ProductTable() {

    const currencyFormatter = (value) => {
        return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    const numberFormatter = (value) => {   
        return parseFloat(value).toFixed(2).replace('.',',');
    }

  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [edit, setEdit] = useState(false);

  //teste

  const url = 'http://localhost:3000/products';

  useEffect(() => {
    // Lista todos os produtos:
    const getProductsList = async() => {
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    }

    getProductsList();

  }, []);

  const clearForm = () => {
    setName("");
    setPrice("");
    setStock("");
  }

  // Busca apenas um produto pelo seu id:
  const getProductById = async(id) => {
    // Faz a requisição http
    const res = await fetch(url + `/${id}`);
    const data = await res.json();
    // Carrega os dados no formulário para edição:
    setName(data.name)
    setPrice(data.price);
    setStock(data.stock);
    setId(data.id);

    // Habilita edição:
    setEdit(true);
  }

  const saveProduct = async (e) => {
    e.preventDefault();
    const saveRequestParams = {
      method: edit ? "PUT" : "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, price, stock })
    }

    // Cria url para buscar todos ou apenas um produto
    const save_url = edit ? url + `/${id}` : url;

    // Faz a requisição http
    const res = await fetch(save_url, saveRequestParams);

    // Se for cadastro de produto novo:
    if(!edit) { 
      const newProduct = await res.json();
      // Atualização da tabela:
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    }

    // Se for edição/atualização de produto já cadastrado:
    if(edit) {       
      const editedProduct = await res.json();
      // Atualização da tabela:
      const editedProductIndex = products.findIndex(prod => prod.id === id);
      products[editedProductIndex] = editedProduct;
      setProducts(products);
   }

    clearForm();
    setEdit(false);
  }

  const deleteProduct = async(id) => {
    // Faz a requisição http
    const res = await fetch(url + `/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
    });

    const deletedProduct = await res.json();
    // Atualização da tabela:
    setProducts(products.filter(prod => prod.id !== deletedProduct.id));
  }

  // Mudança dos estados ao digitar no formulário:
  const handleName = (e) => {setName(e.target.value)};
  const handlePrice = (e) => {setPrice(e.target.value)};
  const handleStock = (e) => {setStock(e.target.value)};

    return (
        <div className={classes.table_container}>
            <h2>Lista de Produtos</h2>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th>Cod.</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Estoque (kg)</th>
                        <th style={{textAlign: 'center'}}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod) => (
                        <tr key={prod.id}>
                            <td>{prod.id}</td>
                            <td>{prod.name}</td>
                            <td>{currencyFormatter(prod.price)}</td>            
                            <td>{numberFormatter(prod.stock)}</td>
                            <td className={classes.actions}>
                            <button onClick={() => editProduct(prod.id)}>Editar</button>
                            <button onClick={() => deleteProduct(prod.id)}>Excluir</button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
import React, { useState, useEffect } from 'react';
import { Container, Row, Alert, Form, Col } from 'react-bootstrap';
import newRequest from '../utils/newRequest';
import CardItems from '../Components/CardItems/CardItems';

const Items = () => {
  const [items, setItems] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '', show: false });
  const [sortOrder, setSortOrder] = useState('asc'); // default sorting order is ascending
  const [searchText, setSearchText] = useState(''); // default search text is an empty string

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await newRequest.get('/items');
        setItems(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItems();
  }, [refetch]);

  const handleDelete = async (id) => {
    try {
      await newRequest.delete(`/items/${id}`);
      setAlert({ message: 'Item deleted successfully', type: 'success', show: true });
      setRefetch(!refetch);
    } catch (err) {
      console.log(err);
      setAlert({ message: 'Something went wrong', type: 'danger', show: true });
    }
  };

  const handleUpdate = async (id, updatedItem) => {
    try {
      await newRequest.put(`/items/${id}`, updatedItem);
      setAlert({ message: 'Item updated successfully', type: 'success', show: true });
      setRefetch(!refetch);
    } catch (err) {
      console.log(err);
      setAlert({ message: 'Something went wrong', type: 'danger', show: true });
    }
  };

  const handleSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    const sortedItems = [...items].sort((a, b) => {
      if (newOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setItems(sortedItems);
  };

  const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchText(searchText);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      {alert.show && (
        <Alert
          variant={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
          dismissible
        >
          {alert.message}
        </Alert>
      )}

      <Container>
        <Row>
          <Col sm={8} className="my-4">
            <Form.Control type="text" placeholder="Search Item ..." onChange={handleSearch} />
          </Col>
          <Col sm={4} className="my-4 d-flex justify-content-end">
            <button onClick={handleSort} className="btn btn-secondary w-100">
              {sortOrder === "asc" ? "Descending (Z-A)" : "Ascending(A-Z)"}
            </button>
          </Col>
          {/*  */}
          {filteredItems.length > 0 ? (
            Object.keys(filteredItems).map((key) => (
              <CardItems
                key={key}
                item={filteredItems[key]}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            ))
          ) : (
            <p>No items found</p>
          )}

        </Row>
      </Container>

    </>
  );
};

export default Items;

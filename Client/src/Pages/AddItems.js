import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import newRequest from '../utils/newRequest';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AddItems = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await newRequest.post('/items', data) // this is the api call to add item to backend nodejs memory
            console.log(response)
            console.log('Item Added')
            navigate('/items')

        }
        catch (err) {
            console.log(err)
            alert('Error Adding Item')
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>

            <Form onSubmit={handleSubmit(onSubmit)} className="bg-white mx-auto p-4 pt-0 m-5 shadow d-flex flex-column justify-content-center "
                style={{ width: '630px', height: '400px', borderRadius: '30px' }}>
                <h1 className='text-center pt-4' >Add New Item</h1>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2} >
                        Name <span className='required'>*</span>
                    </Form.Label>
                    <Col sm={10} >
                        <Form.Control type="text" placeholder="Name" {...register("name", { required: true })} />
                        {errors.name && <p className='error-message'>This field is required</p>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Price <span className='required'>*</span>
                    </Form.Label>
                    <Col sm={10} >
                        <Form.Control type="text" placeholder="Price" {...register("price", { required: true, pattern: /^[0-9]*$/ })} />
                        {errors.price?.type === 'required' && <p className='error-message'>This field is required</p>}
                        {errors.price?.type === 'pattern' && <p className='error-message'>Enter a valid price</p>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 " controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        ImageUrl <span className='required'>*</span>
                    </Form.Label>
                    <Col sm={10} >
                        <Form.Control type="text" placeholder="Url" {...register("img", { required: true })} />
                        {errors.img && <p className='error-message'>This field is required</p>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit">Submit</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}
export default AddItems

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form } from 'react-bootstrap';
import CarCard from './components/CarCard';
import CarMap from './components/CarMap';

interface Car {
    id: number;
    name: string;
    model: string;
    year: number;
    color: string;
    price: number;
    latitude: number;
    longitude: number;
}

const App: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [sortField, setSortField] = useState<keyof Car>('year');
    const [sortOrder, setSortOrder] = useState<string>('asc');

    useEffect(() => {
        axios.get('https://test.tspb.su/test-task/vehicles')
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const handleSort = (field: keyof Car) => {
        const order = sortOrder === 'asc' ? 'desc' : 'asc';
        const sortedCars = [...cars].sort((a, b) => {
            if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
            if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
            return 0;
        });
        setSortField(field);
        setSortOrder(order);
        setCars(sortedCars);
    };

    const handleEdit = (id: number, updatedCar: Car) => {
        setCars(cars.map(car => car.id === id ? updatedCar : car));
    };

    const handleDelete = (id: number) => {
        setCars(cars.filter(car => car.id !== id));
    };

    return (
        <Container>
          <Row>
                <Col>
                    <Form>
                        <Form.Group controlId="sortField">
                            <Form.Label>Sort By</Form.Label>
                            <Form.Control as="select" value={sortField} onChange={(e) => handleSort(e.target.value as keyof Car)}>
                                <option value="year">Year</option>
                                <option value="price">Price</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                {cars.map(car => (
                    <Col key={car.id} md={4}>
                        <CarCard car={car} onEdit={handleEdit} onDelete={handleDelete} />
                    </Col>
                ))}
            </Row>
            <Row>
                <Col>
                    <CarMap cars={cars} />
                </Col>
            </Row>
        </Container>
    );
}

export default App;

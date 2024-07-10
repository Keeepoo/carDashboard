import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

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

interface CarCardProps {
    car: Car;
    onEdit: (id: number, updatedCar: Car) => void;
    onDelete: (id: number) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCar, setEditedCar] = useState<Car>({ ...car });

    const handleSave = () => {
        onEdit(car.id, editedCar);
        setIsEditing(false);
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                {isEditing ? (
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedCar.name}
                                onChange={(e) => setEditedCar({ ...editedCar, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="model">
                            <Form.Label>Model</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedCar.model}
                                onChange={(e) => setEditedCar({ ...editedCar, model: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={editedCar.price}
                                onChange={(e) => setEditedCar({ ...editedCar, price: parseFloat(e.target.value) })}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSave}>Save</Button>
                        <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </Form>
                ) : (
                    <>
                        <Card.Title>{car.name} {car.model}</Card.Title>
                        <Card.Text>
                            Year: {car.year} <br />
                            Price: ${car.price} <br />
                            Color: {car.color}
                        </Card.Text>
                        <Button variant="warning" onClick={() => setIsEditing(true)}>Edit</Button>
                        <Button variant="danger" onClick={() => onDelete(car.id)}>Delete</Button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
};

export default CarCard;

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { getCategories } from "../api/api";
import { useNavigate } from "react-router-dom";

export const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getCategories().then((categoriesData) => {
      setCategories(categoriesData);
      setIsLoading(false);
    });
  }, []);

  const handleClick = (e) => {
    navigate(`/categories/${e.target.textContent}`);
  };

  if (isLoading) {
    return (
      <Container className="">
        <Container className="mx-5 p-5">
          <Spinner animation="border" variant="light" className="m-5 p-4" />;
        </Container>
      </Container>
    );
  }

  return (
    <div className="bg-light">
      <h2 className="text-dark text-center">Here are all the categories:</h2>
      {categories.map((category) => {
        return (
          <Card
            key={category.slug}
            className="my-3 mx-auto"
            style={{ width: "80vw" }}
          >
            <Card.Body className="text-center">
              Description: {category.description}
            </Card.Body>
            <Button
              className="mx-auto my-1 "
              style={{ width: "40vw" }}
              type="button"
              onClick={handleClick}
            >
              {category.slug}
            </Button>
          </Card>
        );
      })}
    </div>
  );
};

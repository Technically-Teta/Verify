import Card from 'react-bootstrap/Card';

    const FruitCard = (props) => {
    
        return (
          <div className={"fruit-section"}>
            <Card>     
                                                            
            <Card.Body><div className='book-text'>{props.fruits.name}</div></Card.Body>
           
            
            </Card>
          </div>
        );
      };
    
    export default FruitCard;


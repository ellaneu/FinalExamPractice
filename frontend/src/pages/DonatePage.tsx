import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import { useState } from "react";

function DonatePage () {

    const navigate = useNavigate();
    const {projectName, projectId} = useParams();
    const {addToCart} = useCart();
    const [donationAmount, setDonationAmount] = useState<number>(0);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            projectId: Number(projectId),
            projectName: projectName || "No project found",
            donationAmount
        }
        addToCart(newItem);
        navigate('/cart')
    }

    return (
      <>
        <WelcomeBand />
        <h2>Donate to {projectName}</h2>

        <div>
          <input type="number" placeholder="Enter donation amount" value={donationAmount} onChange={(x) => setDonationAmount(Number(x.target.value))}/>
          <button onClick={handleAddToCart}> Add to Cart </button>
        </div>

        <button onClick={() => navigate('/projects')}>Go Back</button>
      </>
    );

}

export default DonatePage;
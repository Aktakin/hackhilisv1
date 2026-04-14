import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { 
  FaLaptop, 
  FaWifi, 
  FaShieldAlt, 
  FaTerminal,
  FaShoppingCart,
  FaDollarSign,
  FaPhone,
  FaExclamationTriangle,
  FaSkull,
  FaRecycle,
  FaGavel,
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle
} from 'react-icons/fa';

const StoreContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const StoreHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const StoreTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  color: #00ff41;
  margin-bottom: 10px;
  text-shadow: 0 0 20px #00ff41;
`;

const MoneyDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 1.2rem;
  color: #00ff41;
  font-weight: bold;
`;

const Categories = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button`
  background: ${props => props.active ? '#00ff41' : 'transparent'};
  color: ${props => props.active ? '#000' : '#00ff41'};
  border: 2px solid #00ff41;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Share Tech Mono', monospace;
  font-weight: bold;

  &:hover {
    background: #00ff41;
    color: #000;
    transform: translateY(-2px);
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const ProductCard = styled(motion.div)`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00ffff;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
    transform: translateY(-5px);
  }
`;

const ProductIcon = styled.div`
  font-size: 3rem;
  color: #00ff41;
  margin-bottom: 15px;
`;

const ProductName = styled.h3`
  color: #00ff41;
  margin-bottom: 10px;
  font-size: 1.3rem;
`;

const ProductDescription = styled.p`
  color: #888;
  margin-bottom: 15px;
  line-height: 1.4;
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  color: #00ffff;
  font-weight: bold;
  margin-bottom: 15px;
`;

const BuyButton = styled.button`
  background: linear-gradient(45deg, #00ff41, #00cc33);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: #000;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: linear-gradient(45deg, #00cc33, #00ff41);
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
    transform: translateY(-2px);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
  }
`;

const CartSection = styled.div`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 20px;
  margin-top: 30px;
`;

const CartTitle = styled.h2`
  color: #00ff41;
  margin-bottom: 20px;
  font-family: 'Orbitron', sans-serif;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  margin-bottom: 10px;
`;

const CartItemName = styled.span`
  color: #00ff41;
  font-weight: bold;
`;

const CartItemPrice = styled.span`
  color: #00ffff;
  font-weight: bold;
`;

const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: rgba(0, 255, 65, 0.1);
  border-radius: 8px;
  margin-top: 15px;
  font-size: 1.2rem;
  font-weight: bold;
`;

const CheckoutButton = styled.button`
  background: linear-gradient(45deg, #00ffff, #0099cc);
  border: none;
  border-radius: 8px;
  padding: 15px 30px;
  color: #000;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 15px;

  &:hover {
    background: linear-gradient(45deg, #0099cc, #00ffff);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
    transform: translateY(-2px);
  }
`;

const RiskIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  margin-bottom: 8px;
  color: ${props => 
    props.risk === 'low' ? '#00ff41' :
    props.risk === 'medium' ? '#ffaa00' :
    props.risk === 'high' ? '#ff6600' :
    '#ff0040'
  };
`;

const RiskIcon = styled.div`
  font-size: 1rem;
  color: ${props => 
    props.risk === 'low' ? '#00ff41' :
    props.risk === 'medium' ? '#ffaa00' :
    props.risk === 'high' ? '#ff6600' :
    '#ff0040'
  };
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
  font-size: 0.8rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #888;
`;

const InfoLabel = styled.span`
  color: #888;
`;

const InfoValue = styled.span`
  color: ${props => 
    props.condition === 'Very Good' ? '#00ff41' :
    props.condition === 'Good' ? '#00ff41' :
    props.condition === 'Fair' ? '#ffaa00' :
    props.condition === 'Poor' ? '#ff6600' :
    props.condition === 'Unknown' ? '#ff0040' :
    props.condition === 'Fake' ? '#ff0040' :
    props.condition === 'Classified' ? '#ff0040' :
    props.condition === 'Prototype' ? '#00ffff' :
    props.condition === 'Modified' ? '#ff6600' :
    '#888'
  };
  font-weight: bold;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #666;
  font-size: 0.9rem;
  margin-right: 8px;
`;

const Savings = styled.span`
  color: #00ff41;
  font-weight: bold;
  font-size: 0.9rem;
`;

const IllegalWarning = styled.div`
  background: rgba(255, 0, 64, 0.1);
  border: 1px solid #ff0040;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 10px;
  color: #ff0040;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const WarrantyInfo = styled.div`
  color: ${props => props.warranty === 'No warranty' ? '#ff0040' : '#00ff41'};
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Store = ({ user }) => {
  const { gameState, dispatch } = useGame();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);

  const products = {
    phones: [
      {
        id: 1,
        name: 'Basic Phone',
        description: 'Entry-level smartphone with basic security',
        price: 500,
        icon: FaPhone,
        stats: { security: 3, battery: 5 },
        type: 'phone'
      },
      {
        id: 2,
        name: 'iPhone Pro',
        description: 'High-end smartphone with advanced security',
        price: 1200,
        icon: FaPhone,
        stats: { security: 8, battery: 7 },
        type: 'phone'
      },
      {
        id: 3,
        name: 'Quantum Phone',
        description: 'Cutting-edge quantum-encrypted smartphone',
        price: 5000,
        icon: FaPhone,
        stats: { security: 10, battery: 9 },
        type: 'phone'
      }
    ],
    laptops: [
      {
        id: 1,
        name: 'Basic Laptop',
        description: 'Entry-level laptop for beginners',
        price: 1000,
        icon: FaLaptop,
        stats: { hacking: 5, speed: 3 }
      },
      {
        id: 2,
        name: 'Gaming Laptop',
        description: 'High-performance laptop for serious hackers',
        price: 2500,
        icon: FaLaptop,
        stats: { hacking: 15, speed: 8 }
      },
      {
        id: 3,
        name: 'Quantum Laptop',
        description: 'Cutting-edge quantum computing laptop',
        price: 10000,
        icon: FaLaptop,
        stats: { hacking: 30, speed: 15 }
      }
    ],
    routers: [
      {
        id: 4,
        name: 'Basic Router',
        description: 'Standard home router',
        price: 500,
        icon: FaWifi,
        stats: { networking: 5, range: 3 }
      },
      {
        id: 5,
        name: 'Enterprise Router',
        description: 'Professional-grade router',
        price: 2000,
        icon: FaWifi,
        stats: { networking: 20, range: 10 }
      },
      {
        id: 6,
        name: 'Quantum Router',
        description: 'Next-gen quantum router',
        price: 15000,
        icon: FaWifi,
        stats: { networking: 40, range: 25 }
      }
    ],
    security: [
      {
        id: 7,
        name: 'VPN Service',
        description: 'Anonymous browsing protection',
        price: 300,
        icon: FaShieldAlt,
        stats: { security: 10, anonymity: 8 }
      },
      {
        id: 8,
        name: 'Firewall Pro',
        description: 'Advanced firewall protection',
        price: 800,
        icon: FaShieldAlt,
        stats: { security: 20, protection: 15 }
      }
    ],
    tools: [
      {
        id: 9,
        name: 'Hacking Toolkit',
        description: 'Essential tools for penetration testing',
        price: 1500,
        icon: FaTerminal,
        stats: { hacking: 10, tools: 5 }
      },
      {
        id: 10,
        name: 'Advanced Toolkit',
        description: 'Professional hacking tools suite',
        price: 5000,
        icon: FaTerminal,
        stats: { hacking: 25, tools: 15 }
      }
    ],
    used: [
      {
        id: 11,
        name: 'Used Gaming Laptop',
        description: 'Refurbished gaming laptop - some wear and tear',
        price: 1200,
        originalPrice: 2500,
        icon: FaLaptop,
        stats: { hacking: 12, speed: 6 },
        risk: 'medium',
        condition: 'Good',
        warranty: '30 days'
      },
      {
        id: 12,
        name: 'Second-hand Router',
        description: 'Used enterprise router - previous owner unknown',
        price: 800,
        originalPrice: 2000,
        icon: FaWifi,
        stats: { networking: 15, range: 8 },
        risk: 'high',
        condition: 'Fair',
        warranty: 'No warranty'
      },
      {
        id: 13,
        name: 'Refurbished iPhone',
        description: 'Factory refurbished iPhone Pro - minor scratches',
        price: 600,
        originalPrice: 1200,
        icon: FaPhone,
        stats: { security: 6, battery: 5 },
        risk: 'low',
        condition: 'Very Good',
        warranty: '90 days'
      },
      {
        id: 14,
        name: 'Salvaged Quantum Laptop',
        description: 'Damaged quantum laptop - sold as-is',
        price: 3000,
        originalPrice: 10000,
        icon: FaLaptop,
        stats: { hacking: 20, speed: 8 },
        risk: 'extreme',
        condition: 'Poor',
        warranty: 'No warranty'
      }
    ],
    blackmarket: [
      {
        id: 15,
        name: 'Stolen Gaming Laptop',
        description: 'Hot merchandise - no questions asked',
        price: 800,
        originalPrice: 2500,
        icon: FaLaptop,
        stats: { hacking: 15, speed: 8 },
        risk: 'extreme',
        condition: 'Unknown',
        warranty: 'No warranty',
        illegal: true
      },
      {
        id: 16,
        name: 'Hacked Router',
        description: 'Router with pre-installed backdoors - use at your own risk',
        price: 200,
        originalPrice: 2000,
        icon: FaWifi,
        stats: { networking: 20, range: 10 },
        risk: 'extreme',
        condition: 'Modified',
        warranty: 'No warranty',
        illegal: true
      },
      {
        id: 17,
        name: 'Counterfeit iPhone',
        description: 'High-quality fake - looks real but compromised',
        price: 300,
        originalPrice: 1200,
        icon: FaPhone,
        stats: { security: 2, battery: 3 },
        risk: 'extreme',
        condition: 'Fake',
        warranty: 'No warranty',
        illegal: true
      },
      {
        id: 18,
        name: 'Government Laptop',
        description: 'Classified government equipment - highly illegal',
        price: 5000,
        originalPrice: 50000,
        icon: FaLaptop,
        stats: { hacking: 50, speed: 25 },
        risk: 'extreme',
        condition: 'Classified',
        warranty: 'No warranty',
        illegal: true
      },
      {
        id: 19,
        name: 'Quantum Router Prototype',
        description: 'Stolen prototype - cutting edge but dangerous',
        price: 8000,
        originalPrice: 15000,
        icon: FaWifi,
        stats: { networking: 45, range: 30 },
        risk: 'extreme',
        condition: 'Prototype',
        warranty: 'No warranty',
        illegal: true
      }
    ]
  };

  const allProducts = Object.values(products).flat();

  const filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : products[selectedCategory] || [];

  const addToCart = (product) => {
    const availableMoney = gameState.phone.owned ? gameState.phone.money : gameState.money;
    if (availableMoney >= product.price) {
      setCart([...cart, { ...product, category: selectedCategory }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const checkout = () => {
    const total = getCartTotal();
    const availableMoney = gameState.phone.owned ? gameState.phone.money : gameState.money;
    const isFreeMode = gameState.gameMode === 'free';
    
    // In free mode, everything is free - skip money check
    if (isFreeMode || availableMoney >= total) {
      // Check for high-risk items
      const riskyItems = cart.filter(item => item.risk === 'extreme' || item.illegal);
      const hasRiskyItems = riskyItems.length > 0;
      
      if (hasRiskyItems) {
        const confirmMessage = `WARNING: You are about to purchase ${riskyItems.length} high-risk item(s).\n\n` +
          `These items may:\n` +
          `• Contain malware or backdoors\n` +
          `• Be tracked by authorities\n` +
          `• Compromise your security\n` +
          `• Have no warranty or support\n\n` +
          `Are you sure you want to proceed?`;
        
        if (!window.confirm(confirmMessage)) {
          return;
        }
      }
      
      // Process each item in cart
      cart.forEach(item => {
        if (item.type === 'phone') {
          dispatch({ type: 'PURCHASE_PHONE', payload: item });
        } else if (item.category === 'laptops' || item.category === 'used' || item.category === 'blackmarket') {
          const deviceType = item.name.toLowerCase().includes('laptop') ? 'laptop' : 
                           item.name.toLowerCase().includes('router') ? 'router' : 'laptop';
          
          console.log('Store - Purchasing laptop:', { deviceType, item: item.name, category: item.category });
          console.log('Store - Before purchase equipment state:', gameState.equipment);
          console.log('Store - Item details:', item);
          
          const purchasePayload = { 
            type: deviceType, 
            item: { ...item, name: item.name, price: item.price, risk: item.risk, illegal: item.illegal } 
          };
          
          console.log('Store - Purchase payload:', purchasePayload);
          
          dispatch({ 
            type: 'PURCHASE_EQUIPMENT', 
            payload: purchasePayload
          });
          
          // Note: gameState won't update immediately due to React's async state updates
          // The state will be updated in the next render cycle
          console.log('Store - Dispatched PURCHASE_EQUIPMENT for:', deviceType, item.name);
        } else if (item.category === 'routers') {
          dispatch({ 
            type: 'PURCHASE_EQUIPMENT', 
            payload: { 
              type: 'router', 
              item: { ...item, name: item.name, price: item.price } 
            } 
          });
        } else {
          // Other items go to inventory
          // In free mode, don't deduct money
          if (!isFreeMode) {
            dispatch({ type: 'UPDATE_MONEY', payload: -item.price });
          }
          dispatch({ type: 'ADD_ITEM', payload: item });
        }
      });
      
      setCart([]);
      
      // Log final equipment state after all purchases
      setTimeout(() => {
        console.log('Store - Final equipment state after purchase:', gameState.equipment);
      }, 100);
      
      if (hasRiskyItems) {
        alert('Purchase completed with HIGH SECURITY RISK! Your devices may be compromised. Use with extreme caution!');
      } else {
        alert('Purchase successful! Check your Devices page to use your new equipment.');
      }
    } else {
      alert('Insufficient funds!');
    }
  };

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'phones', name: 'Phones' },
    { id: 'laptops', name: 'Laptops' },
    { id: 'routers', name: 'Routers' },
    { id: 'security', name: 'Security' },
    { id: 'tools', name: 'Tools' },
    { id: 'used', name: 'Used Items' },
    { id: 'blackmarket', name: 'Black Market' }
  ];

  return (
    <StoreContainer>
      <StoreHeader>
        <StoreTitle>Cyber Store</StoreTitle>
        <MoneyDisplay>
          <FaDollarSign />
          ${gameState.phone.owned ? gameState.phone.money.toLocaleString() : gameState.money.toLocaleString()}
          <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '5px' }}>
            {gameState.phone.owned ? 'Phone Wallet' : 'Cash'}
          </div>
        </MoneyDisplay>
      </StoreHeader>

      <Categories>
        {categories.map(category => (
          <CategoryButton
            key={category.id}
            active={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </CategoryButton>
        ))}
      </Categories>

      <ProductsGrid>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              borderColor: product.illegal ? '#ff0040' : 
                          product.risk === 'extreme' ? '#ff6600' :
                          product.risk === 'high' ? '#ffaa00' :
                          '#00ff41'
            }}
          >
            <ProductIcon as={product.icon} />
            <ProductName>{product.name}</ProductName>
            <ProductDescription>{product.description}</ProductDescription>
            
            {product.risk && (
              <RiskIndicator risk={product.risk}>
                <RiskIcon risk={product.risk}>
                  {product.risk === 'low' ? <FaCheckCircle /> :
                   product.risk === 'medium' ? <FaExclamationTriangle /> :
                   product.risk === 'high' ? <FaExclamationTriangle /> :
                   <FaSkull />}
                </RiskIcon>
                Risk Level: {product.risk.toUpperCase()}
              </RiskIndicator>
            )}

            {product.illegal && (
              <IllegalWarning>
                <FaGavel />
                ILLEGAL ITEM - High Security Risk!
              </IllegalWarning>
            )}

            {product.originalPrice && (
              <div style={{ marginBottom: '10px' }}>
                <OriginalPrice>${product.originalPrice.toLocaleString()}</OriginalPrice>
                <Savings>
                  Save ${(product.originalPrice - product.price).toLocaleString()}
                </Savings>
              </div>
            )}

            <ProductPrice>${product.price.toLocaleString()}</ProductPrice>

            {(product.condition || product.warranty) && (
              <ProductInfo>
                {product.condition && (
                  <InfoRow>
                    <InfoLabel>Condition:</InfoLabel>
                    <InfoValue condition={product.condition}>{product.condition}</InfoValue>
                  </InfoRow>
                )}
                {product.warranty && (
                  <InfoRow>
                    <InfoLabel>Warranty:</InfoLabel>
                    <WarrantyInfo warranty={product.warranty}>
                      {product.warranty === 'No warranty' ? <FaTimesCircle /> : <FaCheckCircle />}
                      {product.warranty}
                    </WarrantyInfo>
                  </InfoRow>
                )}
              </ProductInfo>
            )}

            <BuyButton
              onClick={() => addToCart(product)}
              disabled={(gameState.phone.owned ? gameState.phone.money : gameState.money) < product.price}
              style={{
                background: product.illegal ? 'linear-gradient(45deg, #ff0040, #cc0033)' :
                           product.risk === 'extreme' ? 'linear-gradient(45deg, #ff6600, #cc4400)' :
                           'linear-gradient(45deg, #00ff41, #00cc33)'
              }}
            >
              {product.illegal ? 'Buy (RISKY)' : 'Add to Cart'}
            </BuyButton>
          </ProductCard>
        ))}
      </ProductsGrid>

      {cart.length > 0 && (
        <CartSection>
          <CartTitle>Shopping Cart</CartTitle>
          {cart.map((item) => (
            <CartItem key={item.id}>
              <CartItemName>{item.name}</CartItemName>
              <CartItemPrice>${item.price.toLocaleString()}</CartItemPrice>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </CartItem>
          ))}
          <CartTotal>
            <span>Total:</span>
            <span>${getCartTotal().toLocaleString()}</span>
          </CartTotal>
          <CheckoutButton onClick={checkout}>
            Checkout
          </CheckoutButton>
        </CartSection>
      )}
    </StoreContainer>
  );
};

export default Store;

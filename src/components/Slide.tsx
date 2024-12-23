import React from 'react';
import './Slide.css';

interface InitialSlideCard {
    icon: string;
    title: string;
    description: string;
    onClick?: () => void;
}

interface SlideCard {
    title: string;
    description: string;
    onClick?: () => void;
}

interface SlideProps {
    title: string;
    cards: (InitialSlideCard | SlideCard)[];
    isActive: boolean;
    cardBorderColor: string;
    image?: string; // Добавляем поле для изображения
}

const Slide: React.FC<SlideProps> = ({ title, cards, isActive, cardBorderColor, }) => {
    return (
        <div className={`slide ${isActive ? 'active' : ''}`} style={{ '--card-border-color': cardBorderColor } as React.CSSProperties}>
            <div className="slide-content">
                <h2 className="slide-title">{title}</h2>
                <div className="cards-container">
                    {cards.map((card, index) => (
                        <div key={index} className={`${card.hasOwnProperty('icon') ? 'initial-card' : 'card'}`} onClick={card.onClick}>
                            {(card as InitialSlideCard).icon && <img src={(card as InitialSlideCard).icon} alt={card.title} className="card-icon" />}
                            <h3 className="card-title">{card.title}</h3>
                            <p className="card-description">{card.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slide;

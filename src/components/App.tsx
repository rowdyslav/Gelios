import React, { useState, useEffect } from 'react';
import Slide from './Slide';
import './App.css';
import data from '../data.json';

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

interface InitialSlideData {
    title: string;
    cards: InitialSlideCard[];
}

interface SlideData {
    title: string;
    cards: SlideCard[];
    image?: string; // Добавляем поле для изображения
}

type ActivityType = 'physical' | 'science' | 'tech' | 'art' | 'intellectual' | 'social';

const App: React.FC = () => {
    // Определяем функцию для установки выбранной активности
    const handleSetSelectedActivity = (setSelectedActivity: React.Dispatch<React.SetStateAction<ActivityType | null>>) => (activity: ActivityType) => {
        console.log(`Selected activity: ${activity}`);
        setSelectedActivity(activity);
    };

    // Определяем начальный слайд
    const initialSlide: InitialSlideData = {
        title: 'Твои любимые занятия',
        cards: [
            {
                icon: '/sport.gif', // Изображение для физической активности
                title: 'Физическая активность',
                description: 'Делать зарядку, подвижные игры',
                onClick: () => handleSetSelectedActivity(setSelectedActivity)('physical')
            },
            {
                icon: '/flower.gif', // Изображение для природы и науки
                title: 'Природа и наука',
                description: 'Выращивать растения, ухаживать за животными, проводить опыты и эксперименты, изучать организм человека',
                onClick: () => handleSetSelectedActivity(setSelectedActivity)('science')
            },
            {
                icon: '/mouse.gif', // Изображение для техники
                title: 'Техника',
                description: 'Собирать конструктор, работать с техникой, придумывать новые устройства',
                onClick: () => handleSetSelectedActivity(setSelectedActivity)('tech')
            },
            {
                icon: '/creature.gif', // Изображение для творчества
                title: 'Творчество',
                description: 'Рисовать, шить, выступать на сцене, снимать видео, писать сочинения',
                onClick: () => handleSetSelectedActivity(setSelectedActivity)('art')
            },
            {
                icon: '/chess.gif', // Изображение для интеллектуальных занятий
                title: 'Интеллектуальные занятия',
                description: 'Решать задачи, играть в шахматы, изучать иностранные языки, узнавать историю',
                onClick: () => handleSetSelectedActivity(setSelectedActivity)('intellectual')
            },
            {
                icon: '/overpopulation.gif', // Изображение для социальной активности
                title: 'Социальная активность',
                description: 'Помогать людям, придумывать интересные проекты, участвовать в конкурсах',
                onClick: () => handleSetSelectedActivity(setSelectedActivity)('social')
            }
        ]
    };

    // Определяем состояния
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null);
    const [slides, setSlides] = useState<(InitialSlideData | SlideData)[]>([initialSlide]);

    useEffect(() => {
        if (selectedActivity) {
            const recommendations = data.recommendations[selectedActivity];
            const professions = data.professions[selectedActivity];
            const education = data.education[selectedActivity];

            const newSlides: SlideData[] = [
                {
                    title: `Тогда тебе подходит`,
                    cards: recommendations.map(item => ({
                        title: item,
                        description: ''
                    })),
                },
                {
                    title: `Если будешь усердно учиться, ты можешь стать`,
                    cards: professions.map(item => ({
                        title: item,
                        description: ''
                    })),
                },
                {
                    title: `Получить качественное образование в нашем регионе`,
                    cards: education.map(item => ({
                        title: item,
                        description: ''
                    })),
                },
                {
                    title: `Поздравляем, ты простроил свою карьерную траекторию в Рязанской области. Развивайся вместе с нами!`,
                    cards: []
                }
            ];

            setSlides(newSlides);
            setCurrentSlide(0);
        } else {
            setSlides([initialSlide]);
        }
    }, [selectedActivity]);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const getCardBorderColor = () => {
        switch (selectedActivity) {
            case 'physical':
                return 'rgba(255,75,75,0)';
            case 'science':
                return 'rgba(255,215,0,0)';
            case 'tech':
                return 'rgba(128,0,128,0)';
            case 'art':
                return 'rgba(255,75,75,0)';
            case 'intellectual':
                return 'rgba(255,75,75,0)';
            case 'social':
                return 'rgba(255,75,75,0)';
            default:
                return 'rgba(255,255,255,0)';
        }
    };

    const goToHome = () => {
        setCurrentSlide(0);
        setSelectedActivity(null); // Сбрасываем выбранную активность
    };

    return (
        <div className="background-container" style={{ backgroundImage: `url('/3.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="slider-container">
                <div className="slider">
                    <div className="navigation">
                        {currentSlide > 0 ? (
                            <button className="arrow left" onClick={prevSlide}>&#9664;</button>
                        ) : (
                            <div className="arrow-placeholder"></div> /* Невидимый элемент */
                        )}
                        {currentSlide < slides.length - 1 && (
                            <button className="arrow right" onClick={nextSlide}>&#9654;</button>
                        )}
                    </div>

                    {slides.map((slide, index) => (
                        <Slide
                            key={index}
                            isActive={index === currentSlide}
                            title={slide.title}
                            cards={slide.cards}
                            cardBorderColor={getCardBorderColor()}
                            image={(slide as SlideData).image}
                        />
                    ))}
                    {currentSlide > 0 && (
                        <>
                            <button className="home-button" onClick={goToHome}>Домой</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;

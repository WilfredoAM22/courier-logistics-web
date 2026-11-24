
import { useRef, useState } from 'react';
import { type QuoteResponse } from '../types/logistics';
import QuoteFormCard from './QuoteFormCard';
import QuoteResultCard from './QuoteResultCard';

export default function TariffCalculator() {
    const [quote, setQuote] = useState<QuoteResponse | null>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    function handleQuoteCalculated(newQuote: QuoteResponse) {
        setQuote(newQuote);

        setTimeout(() => {
            resultRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }, 100);
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QuoteFormCard onQuoteCalculate={handleQuoteCalculated} />

            <div ref={resultRef} className="scroll-mt-20">
                <QuoteResultCard quote={quote} />
            </div>
        </div>
    );
}

import { useState } from 'react';
import { type QuoteResponse } from '../types/logistics';
import QuoteFormCard from './QuoteFormCard';
import QuoteResultCard from './QuoteResultCard';

export default function TariffCalculator() {
    const [quote, setQuote] = useState<QuoteResponse | null>(null);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuoteFormCard onQuoteCalculate={setQuote} />
    <QuoteResultCard quote={quote} />
    </div>
);
}

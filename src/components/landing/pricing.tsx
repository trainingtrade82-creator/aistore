
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { pricingPlans } from '@/lib/data';
import PricingTable from './pricing-table';

export default function Pricing({ showTable = true }: { showTable?: boolean }) {
  return (
    <section id="pricing" className="py-20 sm:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-foreground/80 md:text-xl">
            Choose the plan that fits you. Start free, upgrade anytime.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col transition-all duration-300 ${
                plan.isPopular ? 'border-primary shadow-2xl scale-105' : 'hover:shadow-xl hover:-translate-y-2'
              }`}
            >
              {plan.isPopular && (
                <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-semibold">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div>
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.name !== 'Free' && <span className="text-foreground/70">/month</span>}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.isPopular ? 'bg-accent text-accent-foreground hover:bg-accent/90' : 'bg-primary text-primary-foreground'
                  }`}
                  size="lg"
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {showTable && <PricingTable />}
      </div>
    </section>
  );
}

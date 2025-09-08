import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const features = [
  { feature: 'Number of AI Tools', free: '30 tools', pro: 'All 50 tools', exclusive: 'All 50 + Premium AIs' },
  { feature: 'Usage', free: 'Limited access', pro: '5,000 queries/month', exclusive: '20,000 queries/month' },
  { feature: 'Response Length', free: 'Normal', pro: 'Full-length', exclusive: 'Full-length' },
  { feature: 'File Uploads & Doc Analysis', free: '❌', pro: '✅', exclusive: '✅ Unlimited' },
  { feature: 'Export & Save Results', free: '❌', pro: '✅', exclusive: '✅' },
  { feature: 'Processing Speed', free: 'Standard', pro: '🚀 Priority', exclusive: '🚀⚡ Fastest' },
  { feature: 'Exclusive AI Tools (Business, Finance, Pitch Deck)', free: '❌', pro: '❌', exclusive: '✅' },
  { feature: 'Custom AI Agent Builder', free: '❌', pro: '❌', exclusive: '✅' },
  { feature: 'Early Access to New AIs', free: '❌', pro: '❌', exclusive: '✅' },
  { feature: 'Premium Support', free: '❌', pro: '❌', exclusive: '🎧 Priority Support' },
];

const plans = [
    { name: 'Free', icon: '🆓', data: 'free'},
    { name: 'Pro', icon: '💼', data: 'pro', popular: true},
    { name: 'Exclusive', icon: '👑', data: 'exclusive'},
]

export default function PricingTable() {
  return (
    <div className="mt-20">
      <Card className="max-w-6xl mx-auto">
        <CardHeader className="text-center px-4 sm:px-6">
          <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
            Compare Plans
          </CardTitle>
          <CardDescription className="mt-2 text-foreground/80 md:text-lg">
            Find the perfect plan for your needs.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0 sm:px-6">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-lg font-semibold w-1/3">Features</TableHead>
                  <TableHead className="text-center text-lg font-semibold">🆓 Free</TableHead>
                  <TableHead className="text-center text-lg font-semibold text-primary relative">
                    <Badge className="absolute -top-7 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                    💼 Pro
                  </TableHead>
                  <TableHead className="text-center text-lg font-semibold">👑 Exclusive</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((item, index) => (
                  <TableRow key={index} className="transition-colors hover:bg-secondary/50">
                    <TableCell className="font-medium">{item.feature}</TableCell>
                    <TableCell className="text-center text-foreground/80">{item.free}</TableCell>
                    <TableCell className="text-center font-semibold text-primary bg-primary/5 border-x-2 border-primary/50">
                      {item.pro}
                    </TableCell>
                    <TableCell className="text-center text-foreground/80">{item.exclusive}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Accordion/Cards */}
          <div className="md:hidden space-y-8 px-4">
            {features.map((feature, index) => (
                <div key={index}>
                    <h4 className="text-center font-semibold text-lg mb-4">{feature.feature}</h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                            <p className="font-bold text-sm mb-1">Free</p>
                            <p className="text-sm text-foreground/80">{feature.free}</p>
                        </div>
                        <div className="border-2 border-primary/50 bg-primary/5 rounded-lg p-2">
                             <p className="font-bold text-sm mb-1 text-primary">Pro</p>
                             <p className="text-sm font-semibold text-primary">{feature.pro}</p>
                        </div>
                        <div>
                             <p className="font-bold text-sm mb-1">Exclusive</p>
                             <p className="text-sm text-foreground/80">{feature.exclusive}</p>
                        </div>
                    </div>
                    {index < features.length - 1 && <Separator className="mt-8" />}
                </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
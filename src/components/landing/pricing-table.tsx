import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

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

export default function PricingTable() {
  return (
    <div className="mt-20">
      <Card className="max-w-6xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
            Compare Plans
          </CardTitle>
          <CardDescription className="mt-2 text-foreground/80 md:text-lg">
            Find the perfect plan for your needs.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}

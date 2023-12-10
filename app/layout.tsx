import { Container, Grid, Theme } from '@radix-ui/themes';
import { Providers } from '../lib/providers';
import { Nav } from './components/Nav/Nav';

import '@radix-ui/themes/styles.css';
import './styles/globals.css';

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <Theme>
            <Grid>
              <Nav />
              <Container>
                <main>{props.children}</main>
              </Container>
            </Grid>
          </Theme>
        </body>
      </html>
    </Providers>
  );
}

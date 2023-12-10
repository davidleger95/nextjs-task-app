import { Container, Grid, Theme } from '@radix-ui/themes';
import { Providers } from '../lib/providers';
import { Nav } from './components/Nav/Nav';

import '@radix-ui/themes/styles.css';
import './styles/globals.css';

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <Providers>
            <Grid>
              <Nav />
              <Container>
                <main>{props.children}</main>
              </Container>
            </Grid>
          </Providers>
        </Theme>
      </body>
    </html>
  );
}

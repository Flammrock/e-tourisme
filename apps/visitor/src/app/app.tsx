// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

// import NxWelcome from './nx-welcome';

import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonContent,
  IonItem,
  IonTitle,
  IonToolbar,
  IonList,
  IonPage,
  IonCol,
  IonMenuButton,
  IonButtons,
  IonIcon,
  IonRow,
  IonButton,
  IonFooter,
  setupIonicReact,
} from '@ionic/react';
/*import { IonReactRouter } from '@ionic/react-router';*/
import { airplane, bed, earth, settings, today, train } from 'ionicons/icons';

import Home from './pages/home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables-ionic.css';
import './theme/variables-amplify.css';

setupIonicReact();

export function App() {
  return (
    <IonApp>
      <React.Suspense fallback={null}>
        <IonMenu side="start" menuId="menu" type="overlay" contentId="main">
          <IonContent>
            <IonList lines="none">
              <IonItem
                className={styles['menu-item']}
                button
                onClick={() => {
                  console.log('e');
                }}
              >
                <IonRow>
                  <IonCol size="2">
                    <IonIcon icon={train} />
                  </IonCol>
                  <IonCol>Travel</IonCol>
                </IonRow>
              </IonItem>
              <IonItem
                className={styles['menu-item']}
                button
                onClick={() => {
                  console.log('e');
                }}
              >
                <IonRow>
                  <IonCol size="2">
                    <IonIcon icon={earth} />
                  </IonCol>
                  <IonCol>Explore</IonCol>
                </IonRow>
              </IonItem>
              <IonItem
                className={styles['menu-item']}
                button
                onClick={() => {
                  console.log('e');
                }}
              >
                <IonRow>
                  <IonCol size="2">
                    <IonIcon icon={today} />
                  </IonCol>
                  <IonCol>To do</IonCol>
                </IonRow>
              </IonItem>
              <IonItem
                className={styles['menu-item']}
                button
                onClick={() => {
                  console.log('e');
                }}
              >
                <IonRow>
                  <IonCol size="2">
                    <IonIcon icon={airplane} />
                  </IonCol>
                  <IonCol>Flights</IonCol>
                </IonRow>
              </IonItem>
              <IonItem
                className={styles['menu-item']}
                button
                onClick={() => {
                  console.log('e');
                }}
              >
                <IonRow>
                  <IonCol size="2">
                    <IonIcon icon={bed} />
                  </IonCol>
                  <IonCol>Hotels</IonCol>
                </IonRow>
              </IonItem>
            </IonList>
          </IonContent>
          <IonFooter>
            <IonList lines="none">
              <IonItem
                className={styles['menu-item']}
                button
                onClick={() => {
                  console.log('e');
                }}
              >
                <IonRow>
                  <IonCol size="2">
                    <IonIcon icon={settings} />
                  </IonCol>
                  <IonCol>Settings</IonCol>
                </IonRow>
              </IonItem>
            </IonList>
          </IonFooter>
        </IonMenu>
        <IonPage id="main">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton></IonMenuButton>
                <IonTitle>E-Tourisme</IonTitle>
              </IonButtons>
              <IonButtons slot="end">
                <IonButton>Account</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonRouterOutlet>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/city" element={<IonPage>city</IonPage>} />
                <Route path="/country" element={<IonPage>country</IonPage>} />
              </Routes>
            </IonRouterOutlet>
          </IonContent>
        </IonPage>
      </React.Suspense>
    </IonApp>
  );
}

export default App;

import * as React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
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
  IonSplitPane,
  IonPage,
  IonMenuButton,
  IonButtons,
} from '@ionic/react';
import {
  AuthConnected,
  AuthContainer,
  AuthLoading,
  AuthNotConnected,
  AuthForm,
} from '@e-tourisme/ui';

/*import { IonReactRouter } from '@ionic/react-router';
  import { ellipse, square, triangle } from 'ionicons/icons';*/

/*
 *TODO:
 * 
 * <AuthConnected>
 *   {(signOut, user) => (
 *     <>
 *       <AuthHasPermission group="admin">
 *         Bonjour Admin ! Nous vous avons préparé du café !
 *       </AuthHasPermission>
 *       <AuthHasNoPermission group="admin">
 *         Hmmm, que faîtes-vous ici..monsieur.. SORTEZZ!!
 *       </AuthHasPermission>
 *     </>
 *   )}
 * </AuthConnected>
 * 
 */

export function Home() {
  return (
    <AuthContainer>
      <div>Salut Visiteur !</div>
      <AuthLoading>Veuillez patienter, nous faisons part de votre venu au backend</AuthLoading>
      <div style={{ background: 'red' }}>
        <AuthConnected>
          {(session) => (
            <>On me dit à l'oreillette que vous êtes bien connecté !</>
          )}
        </AuthConnected>
      </div>
      <AuthNotConnected>
        <AuthForm></AuthForm>
        Hmm, vous n'êtes pas connecté !!
      </AuthNotConnected>
    </AuthContainer>
  );
}

export default Home;

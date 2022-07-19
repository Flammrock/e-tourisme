import * as React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import {
  AuthConnected,
  AuthContainer,
  AuthLoading,
  AuthNotConnected,
  AuthForm,
  AuthHasPermission,
  AuthHasNoPermission,
} from '@e-tourisme/ui';

import { Groups } from '@e-tourisme/core';

/*import { IonReactRouter } from '@ionic/react-router';
  import { ellipse, square, triangle } from 'ionicons/icons';*/

/*
 *TODO:
 *
 * <AuthConnected>
 *   {(signOut, user) => (
 *     <>
 *       <AuthHasPermission group="admin">
 *         You are admin
 *       </AuthHasPermission>
 *       <AuthHasNoPermission group="admin">
 *         You have not enough permissions
 *       </AuthHasNoPermission>
 *     </>
 *   )}
 * </AuthConnected>
 *
 */

export function Home() {
  return (
    <IonGrid>
      <IonRow>
        <IonCol size="0" sizeSm="1" sizeMd="2"></IonCol>
        <IonCol>
          <AuthContainer>
            <div>
              Hi{' '}
              <span role="img" aria-label="welcome">
                👋
              </span>
            </div>
            <AuthLoading>
              <span role="img" aria-label="loading">
                ⌛
              </span>{' '}
              Please wait, we announce your coming to the backend
            </AuthLoading>
            <AuthConnected>
              {(session) => (
                <>
                  You are connected {session.user.name}!
                  <IonButton color="danger" onClick={session.user.signOut}>Sign Out</IonButton>
                  <br /><br /><br />
                  <hr />
                  <AuthHasPermission group={Groups.Admins}>
                    Your account type is <strong>Admin</strong>, you can access to the <Link to="/admin">Admin Space</Link>
                  </AuthHasPermission>
                  <AuthHasPermission group={Groups.Partners}>
                  Your account type is <strong>Partner</strong>, you can access to the <Link to="/partner">Partner Space</Link>
                  </AuthHasPermission>
                  <AuthHasPermission group={Groups.Contributors}>
                  Your account type is <strong>Contributor</strong>, you can access to the <Link to="/contributor">Contributor Space</Link>
                  </AuthHasPermission>
                  <AuthHasPermission group={Groups.Tourists}>
                  Your account type is <strong>Tourist</strong>, you can access to the <Link to="/tourist">Tourist Space</Link>
                  </AuthHasPermission>
                </>
              )}
            </AuthConnected>
            <AuthNotConnected>
              <AuthForm></AuthForm>
              Hmm, you are not logged in!!
            </AuthNotConnected>
          </AuthContainer>
        </IonCol>
        <IonCol size="0" sizeSm="1" sizeMd="2"></IonCol>
      </IonRow>
    </IonGrid>
  );
}

export default Home;

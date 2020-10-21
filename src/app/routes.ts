import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemeberListComponent } from './members/memeber-list/memeber-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailsResolver } from './_resolvers/member-details-resolver';
import { MemberListResolver } from './_resolvers/member-list-resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit-resolver';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { ListResolver } from './_resolvers/lists.resolver';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members', component: MemeberListComponent,
        resolve: { users: MemberListResolver }
      },
        
      {
        path: 'members/:id', component: MemberDetailComponent,
        resolve: { user: MemberDetailsResolver }
      },
      {
        path: 'member/edit', component: MemberEditComponent,
        resolve: {user : MemberEditResolver}, canDeactivate: [PreventUnsavedChangesGuard]
      },
      { path: 'messages', component: MessagesComponent },
      { path: 'lists', component: ListsComponent, resolve: { users: ListResolver } },
    ]
  },

  { path: '**', redirectTo: '', pathMatch: 'full' }
  //any that not fits above routes is mangae by 'wildcard' route
  //ORDER MATTERS HERE IF U PUT WILDCARD FIRST NO ROUTE ARE REACHABLE
];

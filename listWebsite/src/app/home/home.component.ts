import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { HttpClientService } from '../_service/http-client.service';
import { RouterEventService } from '../_service/router-event.service';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { ListCard } from '../components/list-card/list-card.type';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { map, filter, scan } from 'rxjs/operators';
import { InputComponent } from '../components/form/component/input/input.component';
import { NavigationEnd, Router } from '@angular/router';
import { AnimationFrameService } from '../_service/animation-frame.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChildren(InputComponent) input: QueryList<ElementRef>;
  private inputDOM = null;
  public userName: '';
  public reposData: Array<ListCard> = [];
  private start = 0;
  private repos = [];
  public stopLoading = true;
  private httpComplete = [];
  public final = false;
  public showMessage = false;
  public message = '';
  private navigationSubscription;
  constructor(
    private http: HttpClientService,
    private router: Router,
    private routerService: RouterEventService,
    private anFrame: AnimationFrameService
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        console.log(6546546546545);
        this.initialiseInvites();
      }
    });
  }

  // public getxxx(url: string): Promise<any> {
  //   return this.http.get(url).toPromise();
  // }

  // public async aaa() {
  //   const test = await this.getxxx("http://sss");
  //   console.log(test);
  // }
  private setUserName() {
    let name = this.routerService.getQueryParamse('name');
    this.userName = name ? name.trim() : '';
  }

  private getContributors(url: string, index) {
    this.http.get(url).subscribe({
      next: val => {
        const contributors = val.body
                .filter(user => user.login !== this.userName)
                .map(user => {
                  return {
                    name: user.login,
                    url: user.html_url
                  }
                });
        this.reposData[index].contributors = contributors;
        this.httpComplete[index] = true;
        if (this.checkHttpComplete()) {
          this.onLoaded();
        }
      },
      error: error => {
        console.log(error);
      }
    });
    return ;
  }
  private getRepoDetail(url: string, index) {
    return this.http.get(url).subscribe({
      next: res => {
        let dataObj = res.body;
        const result: ListCard = {
          user: this.userName,
          title: dataObj.name,
          text: dataObj.description,
          star: dataObj.stargazers_count,
          url: dataObj.html_url,
          contributors: [],
          created: dataObj.created_at,
          updated: dataObj.updated_at
        };
        this.reposData[index] = result;
        this.getContributors(dataObj.contributors_url, index);
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        console.log(this.reposData);
      }
    });
  }
  private getRepos(name: string) {
    return this.http.get(`https://api.github.com/users/${name}/repos`);
  }
  private setRepos(name: string, callback) {
    console.log(name);
    name = name.trim();
    if (name === '') {
      return;
    }
    this.getRepos(name)
      .subscribe({
        next: res => {
          callback(res);
        },
        error: error => {
          this.setMessage(`No ${this.userName} This User`);
          console.log(error);
        },
        complete: () => {}
      });
  }
  private checkHttpComplete() {
    return this.httpComplete.every(bool => bool);
  }
  private createListCard(start: number, length: number) {
    for (let i = start; i < start + length; i++) {
      let repo = this.repos[i];
      if (!repo) {
        this.final = true;
        this.stopLoading = true;
        break;
      }
      this.start ++;
      this.httpComplete[i] = false;
      this.getRepoDetail(repo.url, i);
    }
    if (this.final) {
      this.setMessage(`No More`);
    }
  }
  private onLoaded(){
    if (!this.final) {
      this.stopLoading = false;
    }
  }
  private onLoading(){
    console.log('in-Loading');
    if (!this.final) {
      console.log('on-Loading');
      if (this.repos.length === 0) {
        this.setMessage(`This User Does Not Have Public Repositories`);
        return;
      }
      this.setMessage(`Loading...`);
      this.stopLoading = true;
      this.createListCard(this.start, 3);
    }
  }
  resetMessage() {
    this.showMessage = false;
    this.message = '';
  }
  setMessage(text: string) {
    this.showMessage = true;
    this.message = text;
  }
  onBottom(){
    if (!this.final && !this.stopLoading) {
      console.log('bottom');
      this.stopLoading = true;
      this.createListCard(this.start, 3);
    }
  }
  onSubmit(event) {
    console.log(event)
    let name = event.value;
    name = name === undefined ? '' : name.trim();
    if (name === '') {
      return;
    }
    this.routerService.linkClick('home',{name});
  }
  onClick() {
    this.onSubmit(this.inputDOM);
  }
  reset() {
    this.resetMessage();
    this.repos.length = 0;
    this.httpComplete.length = 0;
    this.reposData.length = 0;
    this.final = false;
    this.stopLoading = true;
    this.start = 0;

  }
  initialiseInvites() {
    console.log('init');
    this.reset();
    this.setUserName();
    if (this.userName === '') {
      this.setMessage(`Enter User Name To Search`);
      return;
    }
    this.setRepos(
      this.userName,
      (res) => {
        console.log(this.repos);
        this.repos = res.body;
        this.onLoading();
      }
    );
  }
  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.inputDOM = this.input.toArray()[0];
    setTimeout(() => {
      this.anFrame.startAniamtionFrame();
    }, 0);
  }
  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    this.anFrame.unbindingAniamtionFrame();
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}

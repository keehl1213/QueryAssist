import { Subject, of } from 'rxjs';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';
import { refreshTokenRequest } from '@requests/authRequests';

class RefreshTokenQueue {
	queue = new Subject();

	addToQueue({ refreshToken }: { refreshToken: string }) {
		this.queue.next({ refreshToken });
	}

	results() {
		return this.queue.pipe(
			debounceTime(1500),
			//   distinctUntilChanged(),
			switchMap((response: any) => {
				console.log('switchMap', response);
				return refreshTokenRequest(response.refreshToken);
			}),
			catchError((error) => {
				console.log('error', error);
				return of([]);
			})
		);
	}
}

const queue = new RefreshTokenQueue();

queue.results().subscribe({
	next: (res) => console.log('[父]got res: ', res),
	error: (error) => console.log(error),
	complete: () => console.info('complete'),
});

export default queue;

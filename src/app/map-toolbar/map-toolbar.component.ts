import { Component, inject, Signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '../../services/theme.service';
import { SettingsService } from '../../services/settings.service';
import { WarApiService, Shard } from '../../services/war-api.service';
import { Select, SelectChangeEvent } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-map-toolbar',
  imports: [ButtonModule, Select, FormsModule],
  templateUrl: './map-toolbar.component.html',
  styleUrl: './map-toolbar.component.css',
})
export class MapToolbarComponent {
  public readonly themeService = inject(ThemeService);
  private readonly settingsService = inject(SettingsService);

  public selectableShards: string[] = [
    WarApiService.ABLE_SHARD,
    WarApiService.BAKER_SHARD,
    WarApiService.CHARLIE_SHARD,
  ];

  shard: Signal<Shard> = this.settingsService.selectedShard;

  saveSelectedShard($event: SelectChangeEvent) {
    this.settingsService.saveSelectedShard($event.value as Shard);
  }
}
